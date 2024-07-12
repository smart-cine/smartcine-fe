import { cn } from '@/lib/utils';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaFilterPicker({
  className,
  value,
}: {
  readonly className?: string;
  readonly value: string;
}) {
  const isSelected = useBookForm(
    (state) => state.selectedCinemaFilter === value
  );
  const setSelectedCinemaFilter = useBookForm(
    (state) => state.setSelectedCinemaFilter
  );

  return (
    <div
      className={cn(
        'flex w-[50px] cursor-pointer flex-col items-center justify-center gap-y-2 transition-all',
        className
      )}
      onClick={() => {
        setSelectedCinemaFilter(value);
      }}
    >
      <div
        className={cn(
          'h-12 w-12 rounded-md border border-gray-200 p-2 transition-all',
          {
            'border-momo': isSelected,
          }
        )}
      />
      <p
        className={cn('line-clamp-1 text-sm text-gray-500 transition-all', {
          'text-momo': isSelected,
        })}
      >
        {value}
      </p>
    </div>
  );
}
