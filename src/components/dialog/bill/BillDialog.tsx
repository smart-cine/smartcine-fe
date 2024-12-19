import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Decimal } from 'decimal.js';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { useShake } from '@/hooks/useShake';
import { AgeTag } from '@/components/AgeTag';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useReadCinemaRoom } from '@/core/cinema-room/cinema-room.query';
import { useReadCinema } from '@/core/cinema/cinema.query';
import { useCreatePayment } from '@/core/payment/payment.query';
import { TWalletType } from '@/core/payment/payment.type';

import { usePickItem } from '../pick-item/hooks/usePickItem';
import { usePickSeat } from '../pick-seat/usePickSeat';

export function BillDialog({
  className,
  children,
  perform,
  film,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly perform: {
    id: string;
    cinema_id: string;
    cinema_room_id: string;
    start_time: string;
    end_time: string;
    price: string;
    view_type: string;
  };
  readonly film: {
    title: string;
    restrict_age: number;
    description: string;
    tags: string[];
  };
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { ref: refShake, shake } = useShake();

  const { mutateAsync: mutateCreatePayment } = useCreatePayment();
  const { data: cinema } = useReadCinema(perform?.cinema_id);
  const { data: cinema_room } = useReadCinemaRoom(perform?.cinema_room_id);

  const getSeatCodes = usePickSeat((state) => state.getSeatCodes);
  const getTotalMoneySeats = usePickSeat((state) => state.getTotalMoney);
  const getTotalMoneyItems = usePickItem((state) => state.getTotalMoney);
  const getItems = usePickItem((state) => state.getItems);

  const items = useMemo(() => getItems(), [getItems, isOpen]);

  const totalMoneySeats = useMemo(
    () =>
      cinema_room?.layout
        ? getTotalMoneySeats(
            new Decimal(perform?.price ?? '0').toNumber(),
            cinema_room.layout
          )
        : 0,
    [cinema_room?.layout, getTotalMoneySeats, isOpen, perform?.price]
  );

  const totalMoneyItems = useMemo(
    () => getTotalMoneyItems(),
    [getTotalMoneyItems, isOpen]
  );

  const handlePayment = useCallback(async () => {
    const { cart } = usePickItem.getState();
    try {
      const url = await mutateCreatePayment({
        perform_id: perform.id,
        items: items.map((item) => ({
          id: item.item.id,
          quantity: item.quantity,
        })),
        type: TWalletType.VNPAY,
      });
      void router.push(url);
    } catch (error) {
      shake(5);
    }
  }, [mutateCreatePayment, perform.id, router, shake]);

  if (!perform || !film || !cinema || !cinema_room?.layout) {
    return null;
  }

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className='py-6 text-base' variant='momo'>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={refShake}
        className={cn(
          'max-w-[830px] gap-y-0 overflow-hidden border-none p-0',
          className
        )}
        onInteractOutside={(e) => {
          if (isDirty) {
            e.preventDefault();
            shake(5);
          }
        }}
      >
        <div className='flex max-h-[calc(100vh-100px)] min-h-[calc(550px)] w-full flex-row flex-wrap-reverse overflow-x-auto md:flex-nowrap'>
          <div className='flex min-w-[420px] flex-col gap-y-4 p-6'>
            <div className='flex flex-row items-center gap-x-2'>
              <AgeTag restrictAge={film.restrict_age} />
              <p className='font-bold md:text-lg'>{film.title}</p>
            </div>
            <div className='grid grid-cols-2 justify-between gap-x-10 gap-y-4 border-t border-dashed border-gray-200 pt-4'>
              <div className='flex flex-col gap-y-1'>
                <p className='text-gray-500'>Thời gian</p>
                <p className='font-bold'>
                  {moment(perform.start_time).format('HH:mm')} ~{' '}
                  {moment(perform.end_time).format('HH:mm')}
                </p>
              </div>
              <div className='flex flex-col gap-y-1'>
                <p className='text-gray-500'>Ngày chiếu</p>
                {/* <p className='font-bold'>Thứ 7, 12 Tháng 3</p> */}
                <p className='font-bold text-gray-800'>
                  {moment(perform.start_time).format('dddd, DD [Tháng] MM')}
                </p>
              </div>
              <div className='col-span-2 flex flex-col'>
                <p className='text-gray-500'>Rạp</p>
                <p className='font-bold text-gray-800'>{cinema.name}</p>
                <p className='text-sm text-gray-500'>{cinema.address}</p>
              </div>

              <div className='flex flex-col'>
                <p className='text-gray-500'>Phòng chiếu</p>
                <p className='font-bold text-gray-800'>{cinema_room.name}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-gray-500'>Định dạng</p>
                <p className='font-bold text-gray-800'>{perform.view_type}</p>
              </div>
            </div>

            <div className='flex flex-row justify-between border-t border-dashed border-gray-200 pt-4'>
              <div className='flex flex-col'>
                <p className='text-gray-500'>Ghế</p>
                <p className='font-bold text-gray-800'>
                  {getSeatCodes(cinema_room.layout).join(', ')}
                </p>
              </div>
              <div className='flex flex-col items-center font-bold text-gray-800'>
                {vndFormat(totalMoneySeats)}
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-500'>Đồ ăn</p>
              {/* <p className='font-bold text-gray-800'>1 x Sweet Combo 69oz</p> */}
              {items.map((item) => (
                <div
                  key={item.item.id}
                  className='flex flex-row justify-between gap-x-4'
                >
                  <p className='line-clamp-1 font-bold text-gray-800'>
                    {item.quantity} x {item.item.name}
                  </p>
                  <p className='whitespace-nowrap font-bold text-gray-800'>
                    {vndFormat(
                      new Decimal(item.item.price)
                        .times(item.quantity)
                        .toNumber()
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className='grow' />

            <div className='flex flex-row justify-between border-t border-dashed border-gray-200 pt-4'>
              <div className='font-bold text-gray-800'>Tạm tính</div>
              <div className='font-bold text-gray-800'>
                {vndFormat(totalMoneySeats + totalMoneyItems)}
              </div>
            </div>

            <div className='text-xs text-gray-500'>
              Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-4 bg-momo bg-[url('https://homepage.momocdn.net/jk/momo2020/img/intro/qrcode-pattern.png')] from-[#c1177c] to-[#e11b90] bg-[10px_10px] bg-no-repeat py-10">
            <div className='mx-10 flex aspect-square w-full max-w-[280px] flex-col justify-between rounded-lg bg-white p-4'>
              <div className='flex flex-row justify-between overflow-hidden rounded-sm'>
                <div className='h-6 w-6 border-l-[3px] border-t-[3px] border-momo' />
                <div className='h-6 w-6 border-r-[3px] border-t-[3px] border-momo' />
              </div>
              <div className='flex flex-row justify-between overflow-hidden rounded-sm'>
                <div className='h-6 w-6 border-b-[3px] border-l-[3px] border-momo' />
                <div className='h-6 w-6 border-b-[3px] border-r-[3px] border-momo' />
              </div>
            </div>
            <div className='flex flex-col gap-y-5 text-center text-sm text-white'>
              <p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='inline h-6 w-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z'
                  />
                </svg>{' '}
                Quét mã QR để thanh toán hoặc
              </p>
              <Button className='' variant='secondary' onClick={handlePayment}>
                Tới trang thanh toán
              </Button>
            </div>
          </div>
        </div>
        {/* <DialogFooter className='flex h-[124px] flex-col items-end p-4'>
          <div className='flex w-full flex-col gap-y-3'>
            <Button className='py-6 text-base' variant='momo'>
              Tiếp tục
            </Button>
          </div>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

function vndFormat(value: number, prefix = 'đ') {
  return (
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
      .format(value)
      .slice(0, -2) + prefix
  );
}
