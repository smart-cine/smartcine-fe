import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useListCinema } from '@/core/cinema/cinema.query';
import { useReadFilm } from '@/core/film/film.query';

import { Separator } from '../ui/separator';
import { CinemaDescription } from './components/CinemaDescription';
import { ListCinemaFilter } from './components/list-cinema-filter/ListCinemaFilter';
import { ListDate } from './components/list-date/ListDate';
import { Location } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { PerformTimes } from './components/PerformTimes';

export function MinimalBookForm({
  className,
  film_id,
}: {
  readonly className?: string;
  readonly film_id: string;
}) {
  const { data: film } = useReadFilm(film_id);
  const { data: cinemas = [] } = useListCinema();

  if (!film) return null;

  return (
    <div className={cn('flex grow flex-col gap-y-3', className)}>
      <div className='vitri flex flex-row flex-wrap items-center gap-x-3 gap-y-2 md:flex-nowrap'>
        <p className='text-xl font-bold'>Lịch chiếu {film.title}</p>
        <div className='hidden grow lg:block' />
        <div className='flex grow flex-row flex-wrap justify-end gap-x-3 md:flex-nowrap'>
          <Location className='grow' />
          <NearestLocation className='grow' />
        </div>
      </div>
      <div className='flex min-h-[800px] flex-col rounded-md border border-gray-200 shadow-md'>
        <div className='flex max-w-[95vw] grow-0 flex-col border-b pt-2'>
          <ListDate />
          <Separator className='mb-4' />
          <ListCinemaFilter className='px-5' />
        </div>
        <div className='p-4'>
          <Accordion type='single' className='w-full'>
            {cinemas.map((cinema) => (
              <AccordionItem
                key={cinema.id}
                value={cinema.id}
                // className='[&>[data-state=open]]:bg-gray-100' // this is called arbitrary variant
                // https://stackoverflow.com/questions/76408807/style-children-based-on-their-data-attributes-in-tailwindcss
              >
                <AccordionTrigger className='hover:no-underline'>
                  <CinemaDescription variant='minimal' cinema={cinema.name} />
                </AccordionTrigger>
                <AccordionContent>
                  <PerformTimes film_id={film.id} className='' />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
