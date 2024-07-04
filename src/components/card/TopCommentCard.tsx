import Link from 'next/link';
import { MoveRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';

import { CommentIcon } from '../icon/CommentIcon';
import { StarIcon } from '../icon/StarIcon';
import { UserComment } from '../UserComment';
import { FilmCardReview } from './FilmCardReview';
import { MinimalFilmCard } from './MinimalFilmCard';

export function TopCommentCard({
  className,
  film_id,
}: {
  readonly className?: string;
  readonly film_id: string;
}) {
  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-md border border-gray-200 shadow-md',
        className
      )}
    >
      <div className='relative'>
        <FilmCardReview className='h-[200px]' film_id={film.id} />
      </div>
      <div className='flex h-[280px] flex-col gap-y-3 p-4'>
        {[
          'Bao giờ có thế',
          'Phim dỡ lắm nha',
          'phim rat sigma',
          'sigma vl',
        ].map((cmt) => (
          <UserComment key={cmt} body={cmt} />
        ))}
        <Link
          href='#'
          className='flex flex-row items-center justify-end gap-x-1 text-xs font-bold'
        >
          Xem Thêm <MoveRight />
        </Link>
      </div>
    </div>
  );
}
