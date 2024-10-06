import { useMemo } from 'react';
import Image from 'next/image';
import moment from 'moment';

import { useListPerformByFilm } from '@/core/perform/perform.query';

import { FilmPerformCard } from './FilmPerformCard';

export function ListFilmPerform({
  cinema_id,
  date,
}: {
  readonly cinema_id: string;
  readonly date: number;
}) {
  const start_time = useMemo(
    () => moment().add(date, 'days').startOf('day').toISOString(),
    [date]
  );
  const { data: performByFilm = [] } = useListPerformByFilm({
    cinema_id,
    start_time,
  });

  return (
    <div className='flex flex-col gap-y-3 divide-y'>
      {performByFilm.length ? (
        performByFilm.map((item, index) => (
          <FilmPerformCard
            key={item.film_id}
            film_id={item.film_id}
            performs={item.performs}
          />
        ))
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <Image
            alt='Resource not found'
            src='/not-found/resouce-not-found.svg'
            width={200}
            height={200}
          />
          <p className='text-lg font-semibold'>
            Không tìm thấy xuất chiếu nào.
          </p>
          <p className='text-sm text-gray-500'>
            Bạn hãy thử lại với ngày khác hoặc rạp khác nha!
          </p>
        </div>
      )}
    </div>
  );
}
