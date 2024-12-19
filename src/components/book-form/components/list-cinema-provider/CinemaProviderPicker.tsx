import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaProviderPicker({
  className,
  cinema_provider,
}: {
  readonly className?: string;
  readonly cinema_provider: {
    id: string;
    name: string;
    logo_url: string;
  };
}) {
  const isSelected = useBookForm(
    (state) => state.selectedCinemaProviderId === cinema_provider.id
  );
  const setCinemaProvider = useBookForm((state) => state.setCinemaProvider);

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
          src={cinema_provider.logo_url ?? NOT_FOUND_PICTURE.CINEMA_PROVIDER}
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
