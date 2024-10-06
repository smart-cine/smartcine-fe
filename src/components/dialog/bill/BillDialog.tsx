import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Decimal } from 'decimal.js';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { useShake } from '@/hooks/useShake';
import { AgeTag } from '@/components/AgeTag';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useReadCinemaRoom } from '@/core/cinema-room/cinema-room.query';
import {
  TCinemaRoom,
  type TCinemaRoomSeat,
} from '@/core/cinema-room/cinema-room.type';
import { useReadFilm } from '@/core/film/film.query';
import { type TFilm } from '@/core/film/film.type';
import { useListItem } from '@/core/item/item.query';
import { useCreatePayment } from '@/core/payment/payment.query';
import { TWalletType } from '@/core/payment/payment.type';
import { useReadPerform } from '@/core/perform/perform.query';
import { type TPerform } from '@/core/perform/perform.type';

import { usePickItem } from '../pick-item/hooks/usePickItem';
import { usePickSeat } from '../pick-seat/usePickSeat';

export function BillDialog({
  perform_id,
  className,
  children,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly perform_id: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { ref: refShake, shake } = useShake();
  const { mutateAsync: mutateCreatePayment } = useCreatePayment();

  const handlePayment = useCallback(async () => {
    const { cart } = usePickItem.getState();
    try {
      const url = await mutateCreatePayment({
        perform_id,
        items: Object.keys(cart).map((id) => ({
          id,
          quantity: cart[id],
        })),
        type: TWalletType.VNPAY,
      });
      void router.push(url);
    } catch (error) {
      shake(5);
    }
  }, [mutateCreatePayment, perform_id, router, shake]);

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
        className='max-w-3xl gap-y-0 overflow-hidden border-none p-0'
        onInteractOutside={(e) => {
          if (isDirty) {
            e.preventDefault();
            shake(5);
          }
        }}
      >
        {/* <DialogHeader className='relative bg-momo p-4'>
          <DialogTitle className='text-center text-white'>
            Combo bắp - nước
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
        {/* </DialogHeader> */}
        <div className='flex max-h-[calc(100vh-100px)] min-h-[calc(470px)] w-full flex-row flex-wrap-reverse overflow-x-auto md:flex-nowrap'>
          <div className='flex min-w-[420px] flex-col gap-y-2 p-6'>
            <div className='flex flex-row gap-x-2'>
              <AgeTag restrictAge={18} />
              Joker: Folie à Deux - Điên Có Đôi
            </div>
            <Separator className='my-1' />
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col gap-y-1'>
                <p>Thoi gian</p>
                <p className='font-bold'>19:00 ~ 20:51</p>
              </div>
              <div className='flex flex-col gap-y-1'>
                <p>Ngay chieu</p>
                <p className='font-bold'>Thứ 7, 12 Tháng 3</p>
              </div>
            </div>
            <div className='flex flex-col'>
              <p> Rap</p>
              <p className='font-bold'>Beta Quang Trung</p>
              <p>
                Số 645 Quang Trung, Phường 11, Quận Gò Vấp, Thành phố Hồ Chí
                Minh
              </p>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col'>
                <p>Phong chieu</p>
                <p className='font-bold'>P5</p>
              </div>
              <div className='flex flex-col'>
                <p>Phong chieu</p>
                <p className='font-bold'>P5</p>
              </div>
            </div>
            <Separator className='my-1' />
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col'>
                <p>Ghe</p>
                <p className='font-bold'>E2</p>
              </div>
              <div className='flex flex-col items-center font-bold'>80000d</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col'>
                <p>Bap - Nuoc</p>
                <p className='font-bold'>1 x Sweet Combo 69oz</p>
              </div>
              <div className='flex flex-col items-center font-bold'>
                808000d
              </div>
            </div>

            <Separator className='my-1' />

            <div className='flex flex-row justify-between'>
              <div className='font-bold'>Tạm tính</div>
              <div className='font-bold'>168000đ</div>
            </div>

            <div className='text-xs'>
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

function vndFormat(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(value)
    .slice(0, -2);
}
