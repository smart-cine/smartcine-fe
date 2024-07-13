import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaPicker({
  className,
  cinema_id,
}: {
  readonly className?: string;
  readonly cinema_id: string;
}) {
  const isSelected = useBookForm((state) => state.selectedCinema === cinema_id);
  const setSelectedCinema = useBookForm((state) => state.setSelectedCinema);
  const { data: cinema } = useReadCinema(cinema_id);

  if (!cinema) {
    return null;
  }

  return (
    <Button
      key={cinema.id}
      className={cn(
        'flex h-[50px] w-full flex-row justify-start gap-x-3 rounded-none transition-colors',
        {
          'bg-[rgb(255_240_246)] hover:bg-[rgb(255_240_246)]': isSelected,
        }
      )}
      variant='ghost'
      onClick={() => {
        setSelectedCinema(cinema.id);
      }}
    >
      <div className='h-9 w-9 rounded-md border border-gray-200 p-2' />
      <p className='font-normal'>{cinema.name}</p>
    </Button>
  );
}
