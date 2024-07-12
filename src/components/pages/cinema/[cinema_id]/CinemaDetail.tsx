import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ShowMoreText from 'react-show-more-text';

import { cn } from '@/lib/utils';
import { AgeTag } from '@/components/AgeTag';
import { Location } from '@/components/book-form/components/Location';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { TrailerTrigger } from '@/components/dialog/TrailerTrigger';
import { MapPointIcon } from '@/components/icon/MapPointIcon';
import { PlayIcon } from '@/components/icon/PlayIcon';
import { StarIcon } from '@/components/icon/StarIcon';
import { PlayButton } from '@/components/PlayButton';
import { StarRating } from '@/components/Rating';
import { Label } from '@/components/ui/label';
import { useReadCinema } from '@/core/cinema/cinema.query';

export function CinemaDetail({
  className,
  cinema_id,
}: {
  readonly className?: string;
  readonly cinema_id: string;
}) {
  const { data: cinema } = useReadCinema(cinema_id);

  if (!cinema) return null;

  return (
    <div className='flex h-full w-full flex-col justify-end'>
      <div
        className={cn(
          'flex flex-row flex-wrap gap-x-10 gap-y-4 py-16 text-white md:flex-nowrap',
          className
        )}
      >
        <Image
          alt='cinema-avatar'
          src='/cinema/beta-avatar.png'
          width={100}
          height={100}
          className='min-h-full w-auto self-end rounded-sm'
        />
        <div className='flex flex-col gap-y-0.5'>
          <p className='text-4xl font-bold'>{cinema.name}</p>
          <p>Rạp chiếu phim cinema</p>
          <StarRating amount={40} rating={10} className='text-2xl font-bold' />
          <div className='flex flex-row items-center gap-x-1 text-gray-400'>
            <MapPointIcon className='h-5 w-5' />
            25 cửa hàng trong hệ thống
          </div>
        </div>
      </div>
    </div>
  );
}
