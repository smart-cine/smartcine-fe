import { cn } from '@/lib/utils';
import { useListCinema } from '@/core/cinema/cinema.query';

import { CinemaPicker } from './CinemaPicker';

export function ListCinema({ className }: { readonly className?: string }) {
  const { data: cinemas = [] } = useListCinema();

  return (
    <div
      className={cn(
        'flex max-w-[100%] flex-row gap-x-5 overflow-auto py-2',
        className
      )}
    >
      {cinemas.map((cinema) => (
        <CinemaPicker key={cinema.id} cinema_id={cinema.id} />
      ))}
    </div>
  );
}
