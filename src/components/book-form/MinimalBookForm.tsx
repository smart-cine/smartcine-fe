import { cn } from '@/lib/utils';

import { Separator } from '../ui/separator';
import { MemoListCinemaProvider } from './components/list-cinema-provider/ListCinemaProvider';
import { ListCinemaMinimal } from './components/list-cinema/ListCinemaMinimal';
import { ListDate } from './components/list-date/ListDate';
import { MemoLocation } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { useBookForm } from './hooks/useBookForm';

export function MinimalBookForm({
  className,
  film,
}: {
  readonly className?: string;
  readonly film: {
    id: string;
    title: string;
  };
}) {
  return (
    <div className={cn('flex grow flex-col gap-y-3', className)}>
      <div className='relative'>
        <div id='MinimalBookForm' className='absolute -top-[65px]' />
      </div>

      <div className='vitri flex flex-row flex-wrap items-center gap-x-3 gap-y-2 md:flex-nowrap'>
        <p className='text-xl font-bold'>Lịch chiếu {film.title}</p>
        <div className='hidden grow lg:block' />
        <div className='flex grow flex-row flex-wrap justify-end gap-x-3 md:flex-nowrap'>
          <MemoLocation className='grow' />
          <NearestLocation className='grow' />
        </div>
      </div>
      <div className='flex min-h-[800px] flex-col rounded-md border border-gray-200 shadow-md'>
        <div className='flex max-w-[95vw] grow-0 flex-col border-b pt-2'>
          <ListDate />
          <Separator className='mb-4' />
          <MemoListCinemaProvider className='px-5' />
        </div>
        <div className='p-0'>
          <WrapListCinemaMinimal film_id={film.id} />
        </div>
      </div>
    </div>
  );
}

function WrapListCinemaMinimal({ film_id }: { readonly film_id: string }) {
  const searchCinema = useBookForm((state) => state.searchCinema);
  const area = useBookForm((state) => state.selectedArea);
  const cinema_provider_id = useBookForm(
    (state) => state.selectedCinemaProviderId
  );

  return (
    <ListCinemaMinimal
      film_id={film_id}
      searchCinema={searchCinema}
      area={area}
      cinema_provider_id={cinema_provider_id}
    />
  );
}
