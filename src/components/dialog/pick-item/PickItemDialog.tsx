import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Decimal } from 'decimal.js';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { useShake } from '@/hooks/useShake';
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

import { BillDialog } from '../bill/BillDialog';
import { usePickSeat } from '../pick-seat/usePickSeat';
import { usePickItem } from './hooks/usePickItem';

export function PickItemDialog({
  perform_id,
  cinema_id,
  className,
  children,
}: {
  readonly perform_id: string;
  readonly cinema_id: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { ref: refShake, shake } = useShake();
  const { data: items = [] } = useListItem({
    cinema_id,
  });
  const { mutateAsync: mutateCreatePayment } = useCreatePayment();
  const addToCart = usePickItem((state) => state.addToCart);
  const removeFromCart = usePickItem((state) => state.removeFromCart);
  const getTotalMoney = usePickItem((state) => state.getTotalMoney);
  const cart = usePickItem((state) => state.cart);
  const totalMoney = useMemo(() => getTotalMoney(), [getTotalMoney, cart]);

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn(
            'whitespace-nowrap rounded-sm border px-4 py-1',
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent
        ref={refShake}
        className='max-w-lg gap-y-0 overflow-hidden border-none p-0'
        onInteractOutside={(e) => {
          if (isDirty) {
            e.preventDefault();
            shake(5);
          }
        }}
      >
        <DialogHeader className='relative bg-momo p-4'>
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
        </DialogHeader>
        <div className='flex max-h-[calc(100vh-300px)] min-h-[calc(310px)] w-full flex-col overflow-x-auto'>
          {/* pick seat */}
          {items.map((item) => (
            <div key={item.id} className='flex flex-col gap-y-8 px-5 py-4'>
              <div className='flex flex-col justify-between'>
                <div className='flex flex-row gap-x-4'>
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={96}
                    height={96}
                    className='h-24 w-24 items-center justify-center rounded-md object-cover'
                  />
                  <div className='flex flex-col'>
                    <div className='flex flex-col gap-y-1'>
                      <div className='text-base font-bold'>
                        {item.name} - {vndFormat(Number(item.price))}đ
                      </div>
                      <div className='text-sm text-gray-600'>
                        TIẾT KIỆM 46K!!! Gồm: 1 Bắp (69oz) + 2 Nước có gaz
                        (22oz)
                      </div>
                      <div className='text-sm'>
                        {item.items.map((subItem) => (
                          <div
                            key={subItem.id}
                            className='flex flex-row gap-x-2'
                          >
                            <div>{subItem.name}</div>
                            <div>{vndFormat(Number(subItem.price))}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-4'>
                      <Button
                        className='h-5 w-5 rounded-full p-3'
                        variant='momo-outline'
                        onClick={() => {
                          setIsDirty(true);
                          removeFromCart(item);
                        }}
                      >
                        -
                      </Button>
                      <div className='rounded-sm border border-gray-300 px-2 py-0.5 text-sm font-bold'>
                        {cart[item.id]?.quantity ?? 0}
                      </div>
                      <Button
                        className='h-5 w-5 rounded-full p-3'
                        variant='momo'
                        onClick={() => {
                          setIsDirty(true);
                          addToCart(item);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator orientation='horizontal' />
            </div>
          ))}
        </div>
        <DialogFooter className='h-[124px] p-4'>
          <div className='flex w-full flex-col gap-y-3'>
            <div className='flex flex-row justify-between'>
              Tổng cộng
              <div className='text-lg font-bold'>{vndFormat(totalMoney)}đ</div>
            </div>

            <BillDialog perform_id={perform_id}>Tiếp tục</BillDialog>
          </div>
        </DialogFooter>
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
