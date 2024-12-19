import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useListCinema, useReadCinema } from '@/core/cinema/cinema.query';
import { useListPerformByCinema } from '@/core/perform/perform.query';

import { useBookForm } from '../../hooks/useBookForm';
import { CinemaDescription } from '../CinemaDescription';
import { PerformTimes } from '../PerformTimes';

export function ListCinemaMinimal({
  className,
  film_id,
  searchCinema = '',
  area = '',
  // TODO: add filter area here
  cinema_provider_id = '',
}: {
  readonly className?: string;
  readonly film_id: string;
  readonly searchCinema?: string;
  readonly area?: string;
  readonly cinema_provider_id?: string;
}) {
  const [failedFetch, setFailedFetch] = useState<Record<string, boolean>>({});
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

  useEffect(() => {
    setFailedFetch({});
  }, [filteredCinemas]);

  // const content = useMemo(() => {
  //   const result =
  //     .filter((item) => item !== null);

  //   if (!result.length) {
  //     return (
  //       <div className='p-4'>
  //         <div className='text-center'>Không có suất chiếu</div>
  //       </div>
  //     );
  //   }

  //   return result;
  // }, [film_id, filteredCinemas]);

  // console.log('content', content);

  return (
    <Accordion type='single' className='w-full'>
      {filteredCinemas.map((cinema, index) => (
        <Item
          key={cinema.id}
          film_id={film_id}
          cinema={cinema}
          setFailedFetch={setFailedFetch}
          className={cn(
            {
              'border-none': index === filteredCinemas.length - 1,
            },
            'px-4'
          )}
        />
      ))}
    </Accordion>
  );
}

function Item({
  setFailedFetch,
  className,
  film_id,
  cinema,
}: {
  readonly setFailedFetch: Dispatch<SetStateAction<Record<string, boolean>>>;
  readonly className?: string;
  readonly film_id: string;
  readonly cinema: {
    id: string;
    cinema_provider_id: string;
    name: string;
    address: string;
  };
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
        .filter((item) => item.cinema_id === cinema.id)
        .map((item) => item.performs)
        .flat(),
    [performByCinema, cinema.id]
  );

  useEffect(() => {
    setFailedFetch((state) => ({ ...state, [cinema.id]: true }));
  }, [cinema.id, performs, setFailedFetch]);

  if (performs.length) {
    return (
      <AccordionItem
        key={cinema.id}
        className={cn(className)}
        value={cinema.id}
        // className='[&>[data-state=open]]:bg-gray-100' // this is called arbitrary variant
        // https://stackoverflow.com/questions/76408807/style-children-based-on-their-data-attributes-in-tailwindcss
      >
        <AccordionTrigger className='hover:no-underline'>
          <CinemaDescription variant='minimal' cinema={cinema} />
        </AccordionTrigger>
        <AccordionContent>
          <PerformTimes performs={performs} />
        </AccordionContent>
      </AccordionItem>
    );
  }

  return null;
}
