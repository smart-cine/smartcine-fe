import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useManagedState } from '@/hooks/useManageState';
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
import { type TItem } from '@/core/item/item.type';

import { BillDialog } from '../bill/BillDialog';
import { usePickSeat } from '../pick-seat/usePickSeat';
import { usePickItem } from './hooks/usePickItem';

export function PickItemDialog({
  className,
  children,
  items = [],
  perform,
  film,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly items: TItem[];
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
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useManagedState(
    externalOpen,
    externalOnOpenChange
  );
  const [isDirty, setIsDirty] = useState(false);
  const { ref: refShake, shake } = useShake();
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
      <TriggerButton className={className} setDialogOpen={setIsOpen}>
        {children}
      </TriggerButton>
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

            <BillDialog perform={perform} film={film}>
              Tiếp tục
            </BillDialog>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TriggerButton({
  className,
  children,
  setDialogOpen,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly setDialogOpen?: (open: boolean) => void;
}) {
  const pickedSeat = usePickSeat((state) => state.picked);

  return (
    <Button
      variant='momo'
      className={cn(
        'self-end whitespace-nowrap rounded-sm border px-4 py-1',
        className
      )}
      disabled={pickedSeat === 0}
      onClick={() => {
        setDialogOpen?.(true);
      }}
    >
      {children}
    </Button>
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
