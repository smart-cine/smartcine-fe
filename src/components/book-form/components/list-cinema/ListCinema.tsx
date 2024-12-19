import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { useListCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';
import { CinemaPicker } from './CinemaPicker';

export function ListCinema({
  className,
  searchCinema = '',
  searchProvider = '',
  searchArea = '',
}: {
  readonly className?: string;
  readonly searchCinema?: string;
  readonly searchProvider?: string;
  readonly searchArea?: string;
}) {
  const { data: cinemas = [] } = useListCinema({
    provider_id: searchProvider ?? undefined,
  });
  const filteredCinemas = useMemo(
    () =>
      cinemas.filter((cinema) =>
        cinema.name.toLowerCase().includes(searchCinema.toLowerCase())
      ),
    [cinemas, searchCinema]
  );
  const setCinema = useBookForm((state) => state.setCinema);

  useEffect(() => {
    if (filteredCinemas.length) {
      setCinema(filteredCinemas[0].id);
    }
  }, [filteredCinemas, setCinema]);

  return (
    <div className={cn('flex flex-col overflow-y-auto', className)}>
      {filteredCinemas.map((cinema) => (
        <CinemaPicker key={cinema.id} cinema={cinema} />
      ))}
    </div>
  );
}
