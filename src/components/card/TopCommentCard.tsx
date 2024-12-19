import Link from 'next/link';
import { MoveRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useListComment } from '@/core/comment/comment.query';
import { useReadFilm } from '@/core/film/film.query';

import { MinimalComment } from '../comment/MinimalComment';
import { FilmCardReview } from './FilmCardReview';

export function TopCommentCard({
  className,
  film_id,
}: {
  readonly className?: string;
  readonly film_id: string;
}) {
  const { data: film } = useReadFilm(film_id);
  const { data: comments = [] } = useListComment({
    type: 'FILM',
    dest_id: film_id,
  });

  if (!film) return null;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-md border border-gray-200 shadow-md',
        className
      )}
    >
      <div className='relative'>
        <FilmCardReview className='h-[200px]' film={film} />
      </div>
      <div className='flex h-[280px] flex-col gap-y-3 p-4'>
        {comments.map((comment) => (
          <MinimalComment key={comment.id} comment={comment} />
        ))}
        <Link
          href={`/film/${film.id}/review`}
          className='flex flex-row items-center justify-end gap-x-1 text-xs font-bold'
        >
          Xem Thêm <MoveRight />
        </Link>
      </div>
    </div>
  );
}
