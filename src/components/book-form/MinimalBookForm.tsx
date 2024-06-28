import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { films } from '@/lib/fake/films';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type TFilm } from '@/core/film/film.type';

import { AgeTag } from '../AgeTag';
import { Separator } from '../ui/separator';
import { CinemaDescription } from './components/CinemaDescription';
import { CinemaSearch } from './components/CinemaSearch';
import { cinemaList, ListCinema } from './components/ListCinema';
import { ListDate } from './components/ListDate';
import { Location } from './components/Location';
import { NearestLocation } from './components/NearestLocation';
import { PerformTimes } from './components/PerformTimes';

export function MinimalBookForm({
  className,
  film,
}: {
  readonly className?: string;
  readonly film: TFilm;
}) {
  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      <div className='vitri flex flex-row items-center gap-x-3'>
        <p className='text-xl font-bold'>Lịch chiếu {film.title}</p>
        <div className='grow' />
        <Location />
        <NearestLocation />
      </div>
      <div className='flex min-h-[800px] flex-col rounded-md border border-gray-200 shadow-md'>
        <div className='flex flex-col gap-y-3 border-b p-4'>
          <ListDate />
          <Separator />
          <ListCinema />
        </div>
        <div className='p-4'>
          <Accordion type='single' className='w-full'>
            {cinemaList.map((cinema) => (
              <AccordionItem
                key={cinema}
                value={cinema}
                // className='[&>[data-state=open]]:bg-gray-100' // this is called arbitrary variant
                // https://stackoverflow.com/questions/76408807/style-children-based-on-their-data-attributes-in-tailwindcss
              >
                <AccordionTrigger className='hover:no-underline'>
                  <CinemaDescription variant='minimal' cinema={cinema} />
                </AccordionTrigger>
                <AccordionContent>
                  <PerformTimes className='' />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
