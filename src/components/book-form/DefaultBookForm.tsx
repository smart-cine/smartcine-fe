// TODO: replace het not found images thanh constants

import { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { CinemaDescription } from './components/CinemaDescription';
import { MemoCinemaSearch } from './components/CinemaSearch';
import { MemoListCinemaProvider } from './components/list-cinema-provider/ListCinemaProvider';
import { MemoListDate } from './components/list-date/ListDate';
import { MemoListFilmPerform } from './components/list-film-perform/ListFilmPerform';
import { MemoLocation } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { useBookForm } from './hooks/useBookForm';

export function DefaultBookForm({
  className,
  cinema_provider_id,
}: {
  readonly className?: string;
  readonly cinema_provider_id?: string;
}) {
  const selectedCinemaId = useBookForm((state) => state.selectedCinemaId);
  const selectedDate = useBookForm((state) => state.selectedDate);
  const setCinemaProvider = useBookForm((state) => state.setCinemaProvider);

  const { data: cinema } = useReadCinema(selectedCinemaId);
  const { data: cinema_provider } = useReadCinemaProvider(cinema_provider_id);

  useEffect(() => {
    setCinemaProvider(cinema_provider_id ?? '');
  }, []);

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
          <MemoLocation className='max-md:grow' />
          <NearestLocation className='max-md:grow' />
        </div>
        <MemoListCinemaProvider className='px-5 pb-2' />
      </div>
      <div className='mainview flex w-full grow flex-row'>
        <div className='thanhsearch flex min-w-[33%] max-w-[33%] flex-col border-r'>
          <MemoCinemaSearch />
        </div>
        <div className='realmainview flex max-h-full w-full basis-2/3 flex-col overflow-auto'>
          <div className='sticky top-0 z-10 bg-white'>
            {cinema && cinema_provider && (
              <CinemaDescription className='p-3' cinema={cinema} />
            )}
            <MemoListDate />

            <div className='uudai border-t bg-gray-100 px-5 py-2 text-sm text-momo'>
              Đồng giá 79K/vé 2D khi thanh toán bằng Ví Trả Sau, áp dụng 1 vé/1
              khách hàng/1 tháng
            </div>
          </div>
          <MemoListFilmPerform
            cinema_id={selectedCinemaId}
            date={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}
