import { cn } from '@/lib/utils';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaPicker({
  className,
  cinema_id,
}: {
  readonly className?: string;
  readonly cinema_id: string;
}) {
  const { data: cinema } = useReadCinema(cinema_id);
  const setSelectedCinema = useBookForm((state) => state.setSelectedCinema);
  const isSelected = useBookForm((state) => state.selectedCinema === cinema_id);

  if (!cinema) return null;

  return (
    <div
      className={cn(
        'flex w-[50px] cursor-pointer flex-col items-center justify-center gap-y-2 transition-all',
        className
      )}
      onClick={() => {
        setSelectedCinema(cinema_id);
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
        {cinema.name}
      </p>
    </div>
  );
}
