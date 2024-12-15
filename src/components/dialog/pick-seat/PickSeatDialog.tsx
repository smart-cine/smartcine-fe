/* eslint-disable react/no-array-index-key */

import { useMemo, useState } from 'react';
import { Decimal } from 'decimal.js';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { useShake } from '@/hooks/useShake';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useReadCinemaRoom } from '@/core/cinema-room/cinema-room.query';
import { useReadFilm } from '@/core/film/film.query';
import { type TPerform } from '@/core/perform/perform.type';

import { AgeTag } from '../../AgeTag';
import { Separator } from '../../ui/separator';
import { PickItemDialog } from '../pick-item/PickItemDialog';
import { PickedSeats } from './PickedSeats';
import { Seat } from './Seat';
import { usePickSeat } from './usePickSeat';

export function PickSeatDialog({
  className,
  children,
  perform,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly perform: TPerform;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const resetSeats = usePickSeat((state) => state.reset);

  const { ref: refShake, shake } = useShake();

  // console.log('perform', perform);
  // const { data: perform } = useReadPerform(perform_id);
  const { data: film } = useReadFilm(perform?.film_id);
  const { data: cinema_room } = useReadCinemaRoom(perform?.cinema_room_id);

  const layoutSeatMap = useMemo(() => {
    const layoutSeats = cinema_room?.layout?.seats ?? [];
    return Object.fromEntries(layoutSeats.map((seat) => [seat.id, seat]));
  }, [cinema_room]);

  // const seatIdToCoord = useMemo(() => {
  //   const result = new Map<string, string>();
  //   cinema_room?.layout?.seats.forEach((seat) => {
  //     result.set(seat.id, `${seat.x}-${seat.y}`);
  //   });
  //   return result;
  // }, [cinema_room]);

  const coordToSeatId = useMemo(() => {
    const result = new Map<string, string>();
    cinema_room?.layout?.seats.forEach((seat) => {
      result.set(`${seat.x}-${seat.y}`, seat.id);
    });
    return result;
  }, [cinema_room]);

  if (!perform || !film || !cinema_room) return null;

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        resetSeats();
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn(
            'whitespace-nowrap rounded-sm border border-sky-400 px-4 py-1 text-sky-600 hover:border-sky-700',
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent
        ref={refShake}
        className='max-w-4xl gap-y-0 overflow-hidden border-none p-0'
        onInteractOutside={(e) => {
          if (usePickSeat.getState().picked > 0) {
            e.preventDefault();
            shake(5);
          }
        }}
      >
        <DialogHeader className='relative bg-momo p-4'>
          <DialogTitle className='text-center text-white'>
            Mua vé xem phim
          </DialogTitle>
          <div className='absolute left-0 top-0 !mt-0 flex h-full w-full flex-row items-center pl-4 text-white'>
            <ArrowLeft
              className='h-5 w-5 cursor-pointer transition-all hover:-translate-x-1'
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className='h-[calc(100vh-340px)] w-full overflow-x-auto bg-[#262626]'>
          {/* pick seat */}

          <div className='w-fit p-4'>
            {Array.from({ length: cinema_room.layout?.columns ?? 0 }).map(
              (_, index1) => (
                <div key={index1} className='flex flex-row'>
                  {Array.from({ length: cinema_room.layout?.rows ?? 0 }).map(
                    (_, index2) => (
                      <div key={index2} className='flex flex-row'>
                        {coordToSeatId.get(`${index1}-${index2}`) ? (
                          <Seat
                            id={coordToSeatId.get(`${index1}-${index2}`)!}
                            perform_id={perform.id}
                            code={
                              layoutSeatMap[
                                coordToSeatId.get(`${index1}-${index2}`)!
                              ].code
                            }
                          />
                        ) : (
                          <div key={index2} className='m-2 min-h-12 min-w-12' />
                        )}
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
        <DialogFooter className='h-[204px] p-4'>
          <div className='flex w-full flex-col'>
            <div className='mb-3 flex flex-col'>
              <div className='flex flex-row items-center gap-x-2.5'>
                <AgeTag restrictAge={film.restrict_age} />
                <p className='text-lg font-semibold'>{film.title}</p>
              </div>
              <p className='text-sm text-red-500'>
                {[
                  `${moment(perform.start_time).format('HH:mm')} ~ ${moment(perform.end_time).format('HH:mm')}`,
                  moment(perform.start_time).isSame(moment(), 'day')
                    ? 'Hôm nay'
                    : moment(perform.start_time).format('DD/MM'),
                  `Phòng chiếu ${cinema_room.name}`,
                  `${perform.view_type} ${perform.translate_type}`,
                ].join(' · ')}
              </p>
            </div>
            <Separator />
            <PickedSeats cinema_room_id={perform.cinema_room_id} />
            <Separator />
            <div className='flex h-full flex-row py-3'>
              <TotalMoney perform={perform} />
              <div className='grow' />
              <PickItemDialog
                perform_id={perform.id}
                cinema_id={cinema_room.cinema_id}
                className={cn(
                  buttonVariants({
                    variant: 'momo',
                    size: 'default',
                  }),
                  'self-end'
                )}
              >
                Đặt vé
              </PickItemDialog>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TotalMoney({
  children,
  perform,
}: {
  readonly children?: React.ReactNode;
  readonly perform: TPerform;
}) {
  const seats = usePickSeat((state) => state.seats);
  const { data: cinema_room } = useReadCinemaRoom(perform.cinema_room_id);
  const getTotalMoney = usePickSeat((state) => state.getTotalMoney);
  const totalMoney = useMemo(
    () =>
      cinema_room?.layout
        ? getTotalMoney(
            new Decimal(perform.price).toNumber(),
            cinema_room.layout
          )
        : 0,
    [cinema_room?.layout, getTotalMoney, seats]
  );

  if (!cinema_room?.layout) return null;

  return (
    <div className='flex flex-col'>
      <p className='text-sm'>Tạm tính</p>
      <p className='text-lg font-semibold'>
        {vndFormat(Math.ceil(totalMoney))}đ
      </p>
    </div>
  );
}

function vndFormat(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(value)
    .slice(0, -2);
}
