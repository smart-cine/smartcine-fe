/* eslint-disable react/no-array-index-key */

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
  const resetSeats = usePickSeat((state) => state.reset);
  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

  return (
    <Dialog
      onOpenChange={() => {
        resetSeats();
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn(
            'rounded-sm border border-blue-500 px-4 py-1 text-blue-700 hover:border-blue-800',
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Mua vé xem phim</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className='h-[calc(100vh-340px)] w-full overflow-x-auto bg-gray-700'>
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
        <DialogFooter className='h-[200px]'>
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
            <div className='flex flex-row py-3'>
              <p>Chỗ ngồi</p>
              <div className='grow' />
              <div className='self-end rounded-lg border border-gray-300 p-1'>
                H1, H2
              </div>
            </div>
            <Separator />
            <div className='flex h-full flex-row py-3'>
              <p>Tạm tính</p>
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
