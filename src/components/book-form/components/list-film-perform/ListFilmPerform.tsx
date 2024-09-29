import { useMemo } from 'react';
import Image from 'next/image';
import moment from 'moment';

import { useListPerform } from '@/core/perform/perform.query';

import { FilmPerformCard } from './FilmPerformCard';

export function ListFilmPerform({
  cinema_id,
  date,
}: {
  readonly cinema_id: string;
  readonly date: number;
}) {
  const { data: performs } = useListPerform({
    cinema_id,
  });
  const filmIds = useMemo(() => {
    const set = new Set<string>();
    performs?.forEach((perform) => {
      // TODO: bỏ comment này ra để hiển thị tất cả các phim trong ngày
      // if (moment(perform.start_time).isSame(date, 'day')) {
      set.add(perform.film_id);
      // }
    });
    return Array.from(set);
  }, [date, performs]);

  return (
    <div className='flex flex-col gap-y-3 divide-y'>
      {filmIds.length ? (
        filmIds.map((film_id, index) => (
          <FilmPerformCard
            key={film_id}
            film_id={film_id}
            cinema_id={cinema_id}
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
