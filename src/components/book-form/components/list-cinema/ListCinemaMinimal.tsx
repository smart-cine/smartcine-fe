import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useListCinema } from '@/core/cinema/cinema.query';
import { useListPerform } from '@/core/perform/perform.query';

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
  // const { data: performs } = useListPerform({
  //   cinema_id
  //   limit: 5,
  // });
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
          className={cn({
            'border-none': index === filteredCinemas.length - 1,
          })}
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
  const { data: performs = [] } = useListPerform({
    cinema_id,
    limit: 5,
  });
  if (performs.findIndex((perform) => perform.film_id === film_id) === -1)
    return null;

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
        <PerformTimes film_id={film_id} cinema_id={cinema_id} className='' />
      </AccordionContent>
    </AccordionItem>
  );
}
