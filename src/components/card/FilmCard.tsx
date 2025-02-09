import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn, roundScore } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';

import { AgeTag } from '../AgeTag';
import { StarIcon } from '../icon/StarIcon';
import { PlayButton } from '../PlayButton';

export const FilmCard = memo<{
  index?: number;
  variant?: 'black' | 'white';
  className?: string;
  imageClass?: string;
  hasPlayButton?: boolean;
  indexClass?: string;
  film: {
    id: string;
    description: string;
    restrict_age: number;
    picture_url?: string;
    trailer_url?: string;
    title: string;
    tags: string[];
    rating: { score: number };
  };
}>(
  ({
    index,
    variant = 'black',
    className,
    imageClass,
    hasPlayButton = false,
    indexClass,
    film,
  }) => (
    <div className={cn('flex h-full select-none flex-col', className)}>
      <div className={cn('group relative', imageClass)}>
        <div className='h-[calc(100%-10px)]'>
          <Link href={`/film/${film.id}`}>
            <div className='border-blend relative h-full overflow-hidden rounded-md'>
              <Image
                src={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
                width={1000}
                height={1000}
                className={cn(
                  'aspect-[7/10] h-full object-cover duration-300 group-hover:scale-[105%]'
                )}
                alt='picture of the film'
              />
              {hasPlayButton && (
                <PlayButton
                  hasBorder
                  hasTrailerTrigger
                  film={film}
                  className='group-hover:scale-[110%]'
                />
              )}
              <AgeTag
                className='absolute left-1.5 top-1.5'
                restrictAge={film.restrict_age}
              />
            </div>
          </Link>
        </div>
        {index && (
          <div
            className={cn(
              'absolute bottom-0 left-0.5 text-5xl font-bold drop-shadow',
              {
                'text-gray-100': variant === 'black',
                'text-gray-900': variant === 'white',
              },
              indexClass
            )}
          >
            {index}
          </div>
        )}
      </div>

      <div className='flex flex-col'>
        <Link href={`/film/${film.id}`}>
          <p
            className={cn('line-clamp-1 font-semibold', {
              'text-gray-100': variant === 'black',
              'text-gray-900': variant === 'white',
            })}
          >
            {film.title}
          </p>
        </Link>
        <p
          className={cn('line-clamp-1 text-[13px]', {
            'text-gray-400': variant === 'black',
            'text-gray-500': variant === 'white',
          })}
        >
          {film.tags.join(', ') || 'None'}
        </p>
        <div className='mt-1 flex flex-row items-center gap-x-1'>
          <StarIcon className='h-4 w-4' />
          <p
            className={cn('text-xs', {
              'text-gray-300': variant === 'black',
              'text-gray-500': variant === 'white',
            })}
          >
            {roundScore(film.rating.score * 10)}
          </p>
        </div>
      </div>
    </div>
  )
);
FilmCard.displayName = 'FilmCard';
