import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

import { useBookForm } from '../../hooks/useBookForm';

export function CinemaProviderPickerAll({
  className,
}: {
  readonly className?: string;
}) {
  const isSelected = useBookForm(
    (state) => state.selectedCinemaProviderId === ''
  );
  const setCinemaProvider = useBookForm((state) => state.setCinemaProvider);

  return (
    <div
      className={cn(
        'flex w-[50px] cursor-pointer flex-col items-center justify-center gap-y-2 transition-all',
        className
      )}
      onClick={() => {
        setCinemaProvider('');
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
          src='/cinema-provider/all.svg'
          alt='cinema-provider-logo'
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
        Tất cả
      </p>
    </div>
  );
}
