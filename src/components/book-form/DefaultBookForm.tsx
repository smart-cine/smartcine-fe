import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { useListFilm } from '@/core/film/film.query';

import { AgeTag } from '../AgeTag';
import { MinimalFilmCard } from '../card/MinimalFilmCard';
import { CinemaDescription } from './components/CinemaDescription';
import { CinemaSearch } from './components/CinemaSearch';
import { ListCinemaFilter } from './components/list-cinema-filter/ListCinemaFilter';
import { ListDate } from './components/list-date/ListDate';
import { Location } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { PerformTimes } from './components/PerformTimes';

export function DefaultBookForm({
  className,
}: {
  readonly className?: string;
}) {
  const { data: films = [] } = useListFilm();
  if (!films.length) return null;

  return (
    <div
      className={cn(
        'flex max-h-[700px] min-h-[700px] flex-col rounded-md border border-gray-200 shadow-md',
        className
      )}
    >
      <div className='topview flex flex-col gap-y-3 border-b'>
        <div className='flex grow flex-row flex-wrap items-center justify-start gap-x-3 px-5 pt-4 md:flex-nowrap'>
          <p className='hidden md:block'>Vị trí</p>
          <Location className='max-md:grow' />
          <NearestLocation className='max-md:grow' />
        </div>
        <ListCinemaFilter className='px-5 pb-2' />
      </div>
      <div className='mainview flex min-h-full w-full flex-row'>
        <div className='thanhsearch flex basis-1/3 flex-col border-r'>
          <CinemaSearch />
        </div>
        <div className='realmainview flex max-h-full w-full basis-2/3 flex-col overflow-auto'>
          <div className='sticky top-0 z-10 bg-white'>
            <CinemaDescription className='p-3' cinema='AMONG' />
            <ListDate />

            <div className='uudai border-t bg-gray-100 px-5 py-2 text-sm text-momo'>
              Đồng giá 79K/vé 2D khi thanh toán bằng Ví Trả Sau, áp dụng 1 vé/1
              khách hàng/1 tháng
            </div>
          </div>
          <div className='flex flex-col gap-y-3 divide-y'>
            {films.map((film, index) => (
              <div key={film.id} className='flex flex-row gap-x-3 p-4'>
                <MinimalFilmCard
                  film_id={film.id}
                  className='max-w-[120px] rounded-lg'
                />
                <div className='flex flex-col gap-y-5 p-2'>
                  <div className='flex flex-col'>
                    <AgeTag restrictAge={18} />
                    <div className='font-semibold'>{film.title}</div>
                    <div className='tagfilm text-sm text-gray-500'>
                      {film.tags.join(', ')}
                    </div>
                  </div>
                  <PerformTimes film_id={film.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
