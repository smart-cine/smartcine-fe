import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { films } from '@/lib/fake/films';
import { cn } from '@/lib/utils';

import { AgeTag } from '../AgeTag';
import { CinemaDescription } from './components/CinemaDescription';
import { CinemaSearch } from './components/CinemaSearch';
import { ListCinema } from './components/ListCinema';
import { ListDate } from './components/ListDate';
import { Location } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { PerformTimes } from './components/PerformTimes';

export function DefaultBookForm({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        'flex max-h-[800px] min-h-[800px] flex-col rounded-md border border-gray-200 shadow-md',
        className
      )}
    >
      <div className='topview flex flex-col gap-y-3 border-b p-4'>
        <div className='vitri flex flex-row items-center gap-x-3'>
          <p>Vị trí</p>
          <Location />
          <NearestLocation />
        </div>
        <ListCinema />
      </div>
      <div className='mainview flex min-h-full w-full flex-row'>
        <div className='thanhsearch flex basis-1/3 flex-col border-r'>
          <CinemaSearch />
        </div>
        <div className='realmainview flex max-h-full w-full basis-2/3 flex-col overflow-auto'>
          <div className='sticky top-0 bg-white'>
            <CinemaDescription />
            <ListDate />

            <div className='uudai border-t bg-gray-100 px-5 py-2 text-sm text-momo'>
              Đồng giá 79K/vé 2D khi thanh toán bằng Ví Trả Sau, áp dụng 1 vé/1
              khách hàng/1 tháng
            </div>
          </div>
          <div className='flex flex-col gap-y-3 divide-y'>
            {films.map((film, index) => (
              <div key={film.id} className='flex flex-row gap-x-3 p-4'>
                <div>
                  <Image
                    className='h-auto max-w-[200px] rounded-md'
                    width={500}
                    height={500}
                    src={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
                    alt='poster film'
                  />
                </div>
                <div className='flex flex-col gap-y-5 p-2'>
                  <div className='flex flex-col'>
                    <AgeTag restrictAge={18} />
                    <div className='font-semibold'>{film.title}</div>
                    <div className='tagfilm text-sm text-gray-500'>
                      {film.tags.join(', ')}
                    </div>
                  </div>
                  <PerformTimes />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
