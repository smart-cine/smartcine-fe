import Image from 'next/image';

import { cn } from '@/lib/utils';
import { MapPointIcon } from '@/components/icon/MapPointIcon';
import { StarRating } from '@/components/StarRating';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

export function CinemaProviderDetail({
  className,
  cinema_provider_id,
}: {
  readonly className?: string;
  readonly cinema_provider_id: string;
}) {
  const { data: cinema_provider } = useReadCinemaProvider(cinema_provider_id);

  if (!cinema_provider) return null;

  return (
    <div className='flex h-full w-full flex-col justify-end'>
      <div
        className={cn(
          'flex flex-row flex-wrap gap-x-10 gap-y-4 py-16 text-white md:flex-nowrap',
          className
        )}
      >
        <Image
          alt='cinema-avatar'
          src={cinema_provider.logo_url}
          width={100}
          height={100}
          className='min-h-full w-auto self-end rounded-sm'
        />
        <div className='flex flex-col gap-y-0.5'>
          <p className='text-4xl font-bold'>{cinema_provider.name}</p>
          <p>Rạp chiếu phim cinema</p>
          <StarRating
            count={cinema_provider.rating.count}
            rating={cinema_provider.rating.score}
            className='text-2xl font-bold'
          />
          <div className='flex flex-row items-center gap-x-1 text-gray-400'>
            <MapPointIcon className='h-5 w-5' />
            25 cửa hàng trong hệ thống
          </div>
        </div>
      </div>
    </div>
  );
}
