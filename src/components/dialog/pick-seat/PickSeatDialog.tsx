/* eslint-disable react/no-array-index-key */

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Decimal } from 'decimal.js';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';

import { cn, genericMemo } from '@/lib/utils';
import { useManagedState } from '@/hooks/useManageState';
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
import {
  type TCinemaRoomGroup,
  type TCinemaRoomLayout,
  type TCinemaRoomSeat,
} from '@/core/cinema-room/cinema-room.type';
import { useReadFilm } from '@/core/film/film.query';
import { useListItem } from '@/core/item/item.query';
import {
  type ETranslate,
  type EView,
  type TPerform,
} from '@/core/perform/perform.type';

import { AgeTag } from '../../AgeTag';
import { Separator } from '../../ui/separator';
import { PickItemDialog } from '../pick-item/PickItemDialog';
import { PickedSeats } from './PickedSeats';
import { MemoSeat } from './Seat';
import { usePickSeat } from './usePickSeat';

function DialogHeaderSection({ onClose }: { readonly onClose: () => void }) {
  return (
    <DialogHeader className='relative bg-momo p-4'>
      <DialogTitle className='text-center text-white'>
        Mua vé xem phim
      </DialogTitle>
      <div className='absolute left-0 top-0 !mt-0 flex h-full w-full flex-row items-center pl-4 text-white'>
        <ArrowLeft
          className='h-5 w-5 cursor-pointer transition-all hover:-translate-x-1'
          onClick={onClose}
        />
      </div>
    </DialogHeader>
  );
}

const MemoDialogHeaderSection = genericMemo(DialogHeaderSection);

function SeatGrid({
  cinema_room,
  perform_id,
}: {
  readonly cinema_room: {
    layout?: TCinemaRoomLayout;
  };
  readonly perform_id: string;
}) {
  // Retrieve layout seats by id
  const layoutSeatMap = useMemo(() => {
    const result = new Map<string, TCinemaRoomSeat>();
    const layoutSeats = cinema_room?.layout?.seats ?? [];
    layoutSeats.forEach((seat) => {
      result.set(seat.id, seat);
    });
    return result;
  }, [cinema_room]);

  // Retrieve layout groups by id
  const layoutGroupMap = useMemo(() => {
    const result = new Map<string, TCinemaRoomGroup>();
    const layoutGroups = cinema_room?.layout?.groups ?? [];
    layoutGroups.forEach((group) => {
      result.set(group.id, group);
    });
    return result;
  }, [cinema_room]);

  // Retrieve seat id by coordinate
  const coordToSeatIdMap = useMemo(() => {
    const result = new Map<string, string>();
    cinema_room?.layout?.seats.forEach((seat) => {
      result.set(`${seat.x}-${seat.y}`, seat.id);
    });
    return result;
  }, [cinema_room]);

  return (
    <div className='w-fit p-4'>
      {Array.from({ length: cinema_room.layout?.columns ?? 0 }).map(
        (_, index1) => (
          <div key={index1} className='flex flex-row'>
            {Array.from({ length: cinema_room.layout?.rows ?? 0 }).map(
              (_, index2) => (
                <div key={index2} className='flex flex-row'>
                  {coordToSeatIdMap.get(`${index1}-${index2}`) ? (
                    <MemoSeat
                      id={coordToSeatIdMap.get(`${index1}-${index2}`)!}
                      perform_id={perform_id}
                      code={
                        layoutSeatMap.get(
                          coordToSeatIdMap.get(`${index1}-${index2}`)!
                        )!.code
                      }
                      color_code={
                        layoutGroupMap.get(
                          layoutSeatMap.get(
                            coordToSeatIdMap.get(`${index1}-${index2}`)!
                          )!.group_id
                        )!.color_code
                      }
                    />
                  ) : (
                    <div className='m-2 min-h-12 min-w-12' />
                  )}
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

const MemoSeatGrid = genericMemo(SeatGrid);

function FooterInfo({
  film,
  perform,
  cinema_room,
}: {
  readonly film: {
    title: string;
    restrict_age: number;
  };
  readonly perform: {
    start_time: string;
    end_time: string;
    view_type: EView;
    translate_type: ETranslate;
  };
  readonly cinema_room: {
    name: string;
  };
}) {
  return (
    <>
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
    </>
  );
}

const MemoFooterInfo = genericMemo(FooterInfo);

export function PickSeatDialog({
  className,
  children,
  perform,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly perform: TPerform;
  readonly open: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}) {
  const [open, onOpenChange] = useManagedState(
    externalOpen,
    externalOnOpenChange
  );
  const resetSeats = usePickSeat((state) => state.reset);

  const { ref: refShake, shake } = useShake();
  const { data: film } = useReadFilm(perform?.film_id);
  const { data: cinema_room } = useReadCinemaRoom(perform?.cinema_room_id);
  const { data: items = [] } = useListItem({
    cinema_id: perform.cinema_id,
  });
  console.log('cinemaid', perform.cinema_id, items);

  const handleClose = useCallback(() => {
    resetSeats();
    onOpenChange(false);
  }, []);

  if (!perform || !film || !cinema_room) return null;

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        resetSeats();
        onOpenChange(open);
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
        <MemoDialogHeaderSection onClose={handleClose} />
        <div className='h-[calc(100vh-340px)] w-full overflow-x-auto bg-[#262626]'>
          <MemoSeatGrid cinema_room={cinema_room} perform_id={perform.id} />
        </div>
        <DialogFooter className='h-[204px] p-4'>
          <div className='flex w-full flex-col'>
            <MemoFooterInfo
              film={film}
              perform={perform}
              cinema_room={cinema_room}
            />
            <Separator />
            <PickedSeats cinema_room_id={perform.cinema_room_id} />
            <Separator />
            <div className='flex h-full flex-row py-3'>
              <TotalMoney perform={perform} />
              <div className='grow' />
              <PickItemDialog perform={perform} film={film} items={items}>
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
