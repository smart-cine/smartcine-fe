/* eslint-disable react/no-array-index-key */

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useReadFilm } from '@/core/film/film.query';
import { type TFilm } from '@/core/film/film.type';

import { AgeTag } from '../../AgeTag';
import { Separator } from '../../ui/separator';
import { PickedSeats } from './PickedSeats';
import { Seat } from './Seat';
import { usePickSeat } from './usePickSeat';

export function PickSeatDialog({
  className,
  children,
  film_id,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly film_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const resetSeats = usePickSeat((state) => state.reset);

  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

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
            'rounded-sm border border-sky-400 px-4 py-1 text-sky-600 hover:border-sky-700',
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl gap-y-0 overflow-hidden border-none p-0'>
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
            {Array.from({ length: 8 }).map((_, index1) => (
              <div key={index1} className='flex flex-row'>
                {Array.from({ length: 13 }).map((_, index2) => (
                  <div key={index2} className='flex flex-row'>
                    <Seat id={`${index1 + 1}-${index2 + 1}`} />
                  </div>
                ))}
              </div>
            ))}
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
                11:00 ~ 13:05 · Hôm nay, 02/07 · Phòng chiếu Screen02 · 2D Lồng
                tiếng
              </p>
            </div>
            <Separator />
            <PickedSeats />
            <Separator />
            <div className='flex h-full flex-row py-3'>
              <p className='text-sm'>Tạm tính</p>
              <div className='grow' />
              <Button type='submit' className='self-end'>
                Save changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
