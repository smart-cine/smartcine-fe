import { AgeTag } from '@/components/AgeTag';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { useReadFilm } from '@/core/film/film.query';

import { PerformTimes } from '../PerformTimes';

export function FilmPerformCard({
  film_id,
  cinema_id,
}: {
  readonly film_id: string;
  readonly cinema_id: string;
}) {
  const { data: film } = useReadFilm(film_id);
  if (!film) return null;

  return (
    <div key={film.id} className='flex flex-row gap-x-3 p-4'>
      <MinimalFilmCard film_id={film.id} className='max-w-[120px] rounded-lg' />
      <div className='flex flex-col gap-y-5 p-2'>
        <div className='flex flex-col'>
          <AgeTag restrictAge={18} />
          <div className='font-semibold'>{film.title}</div>
          <div className='tagfilm text-sm text-gray-500'>
            {film.tags.join(', ')}
          </div>
        </div>
        <PerformTimes film_id={film.id} cinema_id={cinema_id} />
      </div>
    </div>
  );
}
