import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaPicker({
  className,
  cinema_id,
}: {
  readonly className?: string;
  readonly cinema_id: string;
}) {
  const isSelected = useBookForm(
    (state) => state.selectedCinemaId === cinema_id
  );
  const setCinema = useBookForm((state) => state.setCinema);
  const { data: cinema } = useReadCinema(cinema_id);
  const { data: provider } = useReadCinemaProvider(cinema?.provider_id);

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
        setCinema(cinema.id);
      }}
    >
      <div className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 p-1'>
        <Image
          alt='cinema-logo'
          src={provider?.logo_url ?? '/cinema/logo/unknown.png'}
          width={36}
          height={36}
          className='min-h-6 min-w-6 rounded-sm object-cover'
        />
      </div>
      <p className='font-normal'>{cinema.name}</p>
    </Button>
  );
}
