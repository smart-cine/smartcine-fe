import Image from 'next/image';
import Link from 'next/link';
import { TagIcon } from 'lucide-react';

import { cn, roundScore } from '@/lib/utils';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

import { MapPointIcon } from '../icon/MapPointIcon';

export function CinemaProviderCard({
  className,
  id,
}: {
  readonly className?: string;
  readonly id: string;
}) {
  const { data: cinema_provider } = useReadCinemaProvider(id);
  if (!cinema_provider) {
    return null;
  }

  return (
    <Link href={`/cinema-provider/${id}`}>
      <div
        className={cn(
          'flex min-h-[150px] cursor-pointer flex-row flex-wrap items-center gap-x-5 rounded-md border border-gray-200 p-3 shadow-sm duration-100 hover:shadow-md',
          className
        )}
      >
        <div className='flex h-[60px] w-[100px] items-center justify-center'>
          <Image
            src={
              // TODO: đổi thành constant unknown logo
              cinema_provider.logo_url ?? '/cinema-provider/logo/unknown.png'
            }
            alt='cinema-logo'
            width={80}
            height={80}
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <p className='text-lg font-bold text-momo'>{cinema_provider.name}</p>
          <div className='text-sm'>
            <p className='text text-gray-500'>
              Hệ thống rạp chiếu phim từ {cinema_provider.country}
            </p>
            <p className='flex flex-row items-center gap-x-1 text-momo'>
              <TagIcon className='h-4 w-4' />
              Ưu đãi 89K/vé 2D cả tuần không giới hạn
            </p>
          </div>
          <div className='flex flex-row gap-x-1'>
            <span className='font-semibold'>
              {roundScore(cinema_provider.rating.score)}
            </span>
            ⭐️
          </div>
          <div className='flex flex-row items-center gap-x-1 text-sm text-gray-400'>
            <MapPointIcon className='h-4 w-4' />
            {cinema_provider.cinema_count} rạp
          </div>
        </div>
      </div>
    </Link>
  );
}
