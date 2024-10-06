import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useListCinema } from '@/core/cinema/cinema.query';
import { useListPerformByCinema } from '@/core/perform/perform.query';

import { useBookForm } from '../../hooks/useBookForm';
import { CinemaDescription } from '../CinemaDescription';
import { PerformTimes } from '../PerformTimes';

export function ListCinemaMinimal({
  className,
  film_id,
  searchCinema = '',
  area = '',
  // TODO: filter area
  cinema_provider_id = '',
}: {
  readonly className?: string;
  readonly film_id: string;
  readonly searchCinema?: string;
  readonly area?: string;
  readonly cinema_provider_id?: string;
}) {
  const { data: cinemas = [] } = useListCinema({
    provider_id: cinema_provider_id ? cinema_provider_id : undefined,
  });
  const filteredCinemas = useMemo(
    () =>
      cinemas.filter((cinema) =>
        cinema.name.toLowerCase().includes(searchCinema.toLowerCase())
      ),
    [cinemas, searchCinema]
  );
  const content = useMemo(() => {
    const result = filteredCinemas
      .map((cinema, index) => (
        <Item
          key={cinema.id}
          className={cn(
            {
              'border-none': index === filteredCinemas.length - 1,
            },
            'px-4'
          )}
          cinema_id={cinema.id}
          film_id={film_id}
        />
      ))
      .filter((item) => item !== null);

    if (!result.length) {
      return (
        <div className='p-4'>
          <div className='text-center'>Không có suất chiếu</div>
        </div>
      );
    }

    return result;
  }, [film_id, filteredCinemas]);

  return (
    <Accordion type='single' className='w-full'>
      {content}
    </Accordion>
  );
}

function Item({
  className,
  cinema_id,
  film_id,
}: {
  readonly className?: string;
  readonly cinema_id: string;
  readonly film_id: string;
}) {
  const date = useBookForm((state) => state.selectedDate);
  const cinema_provider_id = useBookForm(
    (state) => state.selectedCinemaProviderId
  );
  const { data: performByCinema = [] } = useListPerformByCinema({
    film_id,
    cinema_provider_id: cinema_provider_id ? cinema_provider_id : undefined,
    start_time: moment().add(date, 'days').startOf('day').toISOString(),
    area: 'Ho Chi Minh',
  });
  const performs = useMemo(
    () =>
      performByCinema
        .filter((item) => item.cinema_id === cinema_id)
        .map((item) => item.performs)
        .flat(),
    [performByCinema, cinema_id]
  );

  return (
    <AccordionItem
      key={cinema_id}
      className={cn(className)}
      value={cinema_id}
      // className='[&>[data-state=open]]:bg-gray-100' // this is called arbitrary variant
      // https://stackoverflow.com/questions/76408807/style-children-based-on-their-data-attributes-in-tailwindcss
    >
      <AccordionTrigger className='hover:no-underline'>
        <CinemaDescription variant='minimal' cinema_id={cinema_id} />
      </AccordionTrigger>
      <AccordionContent>
        <PerformTimes performs={performs} />
      </AccordionContent>
    </AccordionItem>
  );
}
