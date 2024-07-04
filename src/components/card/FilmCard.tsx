import Image from 'next/image';
import Link from 'next/link';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';
import { type TFilm } from '@/core/film/film.type';

import { AgeTag } from '../AgeTag';
import { StarIcon } from '../icon/StarIcon';
import { PlayButton } from '../PlayButton';

export function FilmCard({
  film_id,
  index,
  variant = 'black',
  className,
  imageClass,
  hasPlayButton,
  indexClass,
}: {
  readonly film_id: string;
  readonly index?: number;
  readonly variant?: 'black' | 'white';
  readonly className?: string;
  readonly imageClass?: string;
  readonly hasPlayButton?: boolean;
  readonly indexClass?: string;
}) {
  const { data: film } = useReadFilm(film_id);
  if (!film) return null;

  return (
    <div className={cn('flex h-full select-none flex-col', className)}>
      <Link
        href={`/film/${film.id}`}
        className={cn('group relative', imageClass)}
      >
        <div className='h-[calc(100%-10px)]'>
          <div className={cn('relative h-full overflow-hidden rounded-md')}>
            <Image
              src={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
              width={1000}
              height={1000}
              className={cn(
                'h-full object-cover duration-300 group-hover:scale-[105%]'
              )}
              alt='picture of the film'
            />
            {hasPlayButton && (
              <div className='absolute left-0 top-0 flex h-full w-full items-center'>
                <PlayButton
                  hasBorder
                  film_id={film.id}
                  className='group-hover:scale-[110%]'
                />
              </div>
            )}
            <AgeTag
              className='absolute left-1.5 top-1.5'
              restrictAge={film.restrict_age}
            />
          </div>
        </div>
        {index && (
          <div
            className={cn(
              'absolute bottom-0 left-0.5 text-5xl font-bold',
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
      </Link>

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
          {film.tags.join(', ')}
        </p>
        <div className='mt-1 flex flex-row items-center gap-x-1'>
          <StarIcon className='h-4 w-4' />
          <p
            className={cn('text-xs', {
              'text-gray-300': variant === 'black',
              'text-gray-500': variant === 'white',
            })}
          >
            10
          </p>
        </div>
      </div>
    </div>
  );
}
