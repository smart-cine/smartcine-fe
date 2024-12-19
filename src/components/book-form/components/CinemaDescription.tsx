import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

export function CinemaDescription({
  className,
  variant = 'default',
  cinema,
}: {
  readonly className?: string;
  readonly variant?: 'default' | 'minimal';
  readonly cinema: {
    cinema_provider_id: string;
    name: string;
    address: string;
  };
}) {
  const { data: cinema_provider } = useReadCinemaProvider(
    cinema.cinema_provider_id
  );

  return (
    <div
      className={cn(
        'flex w-full flex-row items-center gap-x-2 text-left',
        {
          'bg-gray-50': variant === 'default',
          'bg-white': variant === 'minimal',
        },
        className
      )}
    >
      <div className='flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200'>
        <Image
          src={cinema_provider?.logo_url ?? NOT_FOUND_PICTURE.CINEMA_PROVIDER}
          alt='cinema-logo'
          width={36}
          height={36}
          className='h-6 w-6 rounded-sm object-cover'
        />
      </div>
      <div className='flex w-full flex-col'>
        <p className='font-semibold'>{cinema.name}</p>
        <p className='flex items-center justify-between gap-x-1 text-sm font-thin text-gray-500'>
          {cinema.address}
          <a
            className='h-full whitespace-nowrap text-blue-500'
            href='#'
            onClick={(e) => {
              // must stop propagation bcuz of Accordion trigger component
              e.stopPropagation();
            }}
          >
            [ Bản đồ ]
          </a>
        </p>
      </div>
    </div>
  );
}
