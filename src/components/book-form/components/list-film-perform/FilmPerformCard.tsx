import { AgeTag } from '@/components/AgeTag';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { useReadFilm } from '@/core/film/film.query';
import { type TPerform } from '@/core/perform/perform.type';

import { PerformTimes } from '../PerformTimes';

export function FilmPerformCard({
  performs,
  film_id,
}: {
  readonly performs: TPerform[];
  readonly film_id: string;
}) {
  const { data: film } = useReadFilm(film_id);

  if (!film) {
    return null;
  }

  return (
    <div key={film.id} className='flex flex-row gap-x-3 p-4'>
      <MinimalFilmCard film={film} className='max-w-[120px] rounded-lg' />
      <div className='flex flex-col gap-y-5 p-2'>
        <div className='flex flex-col'>
          <AgeTag restrictAge={film.restrict_age} />
          <div className='font-semibold'>{film.title}</div>
          <div className='tagfilm text-sm text-gray-500'>
            {film.tags.join(', ')}
          </div>
        </div>
        <PerformTimes performs={performs} />
      </div>
    </div>
  );
}
