import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { useListCinema } from '@/core/cinema/cinema.query';

import { CinemaFilterPicker } from './CinemaFilterPicker';

export function ListCinemaFilter({
  className,
}: {
  readonly className?: string;
}) {
  const { data: cinemas = [] } = useListCinema();
  const cinemaProviders = useMemo(
    () => Object.groupBy(cinemas, (cinema) => cinema.variant),
    [cinemas]
  );

  return (
    <div
      className={cn(
        'flex max-w-[100%] flex-row gap-x-5 overflow-auto py-2',
        className
      )}
    >
      {Object.keys(cinemaProviders).map((providerName) => (
        <CinemaFilterPicker key={providerName} value={providerName} />
      ))}
    </div>
  );
}
