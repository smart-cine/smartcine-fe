import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';

import { CommentIcon } from '../icon/CommentIcon';
import { StarIcon } from '../icon/StarIcon';
import { MinimalFilmCard } from './MinimalFilmCard';

export function FilmCardReview({
  film_id,
  className,
  hasPlayButton = false,
  hasTitle = false,
}: {
  readonly film_id: string;
  readonly className?: string;
  readonly hasPlayButton?: boolean;
  readonly hasTitle?: boolean;
}) {
  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <MinimalFilmCard
        hasPlayButton={hasPlayButton}
        film_id={film.id}
        className='h-full'
      />
      <div className='absolute bottom-0 flex flex-col p-2.5 text-sm font-bold text-gray-100'>
        {hasTitle && <div className=''>Kẻ trộm mặt trăng 4</div>}
        <div className='flex flex-row gap-x-5'>
          <div className='group flex cursor-pointer flex-row items-center gap-x-1 transition-all hover:-translate-y-0.5'>
            <StarIcon className='h-7 w-7' />
            <p>9.1</p>
          </div>
          <Link href={`/film/${film.id}/review`}>
            <div className='flex flex-row items-center gap-x-1 transition-all hover:-translate-y-0.5'>
              <CommentIcon className='h-7 w-7' />
              <p>9.1</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
