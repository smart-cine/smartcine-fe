import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaProviderPicker({
  className,
  cinema_provider_id,
}: {
  readonly className?: string;
  readonly cinema_provider_id: string;
}) {
  const { data: cinema_provider } = useReadCinemaProvider(cinema_provider_id);
  const isSelected = useBookForm(
    (state) => state.selectedCinemaProviderId === cinema_provider_id
  );
  const setCinemaProvider = useBookForm((state) => state.setCinemaProvider);

  if (!cinema_provider) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex w-[50px] cursor-pointer flex-col items-center justify-center gap-y-2 transition-all',
        className
      )}
      onClick={() => {
        setCinemaProvider(cinema_provider.id);
      }}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 transition-all',
          {
            'border-momo': isSelected,
          }
        )}
      >
        <Image
          src={cinema_provider.logo_url ?? '/cinema-provider/logo/unknown.png'}
          alt='cinema-logo'
          width={40}
          height={40}
          className='h-9 w-9 rounded-sm object-cover'
        />
      </div>

      <p
        className={cn('line-clamp-1 text-sm text-gray-500 transition-all', {
          'text-momo': isSelected,
        })}
      >
        {cinema_provider.name}
      </p>
    </div>
  );
}
