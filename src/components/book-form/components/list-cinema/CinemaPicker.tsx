import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';
import { useReadCinema } from '@/core/cinema/cinema.query';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaPicker({
  className,
  cinema,
}: {
  readonly className?: string;
  readonly cinema: {
    readonly id: string;
    readonly name: string;
    readonly cinema_provider_id: string;
  };
}) {
  const isSelected = useBookForm(
    (state) => state.selectedCinemaId === cinema.id
  );
  const setCinema = useBookForm((state) => state.setCinema);
  const { data: cinema_provider } = useReadCinemaProvider(
    cinema.cinema_provider_id
  );

  return (
    <Button
      key={cinema.id}
      className={cn(
        'flex h-[50px] w-full flex-row justify-start gap-x-3 rounded-none transition-colors',
        {
          'bg-[rgb(255_240_246)] hover:bg-[rgb(255_240_246)]': isSelected,
        },
        className
      )}
      variant='ghost'
      onClick={() => {
        setCinema(cinema.id);
      }}
    >
      <div className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 p-1'>
        <Image
          alt='cinema-logo'
          src={cinema_provider?.logo_url ?? NOT_FOUND_PICTURE.CINEMA_PROVIDER}
          width={36}
          height={36}
          className='min-h-6 min-w-6 rounded-sm object-cover'
        />
      </div>
      <p className='font-normal'>{cinema.name}</p>
    </Button>
  );
}
