import Image from 'next/image';
import Link from 'next/link';
import { TagIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { MapPointIcon } from '../icon/MapPointIcon';

export function CinemaProviderCard({
  className,
  provider,
}: {
  readonly className?: string;
  readonly provider: string;
}) {
  // const { data: cinema } = useReadCinema(cinema_id);
  // if (!cinema) return null;

  return (
    <Link href={`/cinema/${1}`}>
      <div
        className={cn(
          'flex min-h-[150px] cursor-pointer flex-row flex-wrap items-center gap-x-5 rounded-md border border-gray-200 p-3 shadow-sm duration-100 hover:shadow-md',
          className
        )}
      >
        <div className='flex h-[60px] w-[100px] items-center justify-center'>
          <Image
            src={`/cinema/logo/${provider.toLowerCase()}.png`}
            alt='cinema-logo'
            width={80}
            height={80}
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <p className='text-lg font-bold text-momo'>{provider}</p>
          <div className='text-sm'>
            <p className='text text-gray-500'>
              Hệ thống rạp chiếu phim từ Hàn Quốc
            </p>
            <p className='flex flex-row items-center gap-x-1 text-momo'>
              <TagIcon className='h-4 w-4' />
              Ưu đãi 89K/vé 2D cả tuần không giới hạn
            </p>
          </div>
          <div className='flex flex-row gap-x-1'>
            <span className='font-semibold'>4.5</span>
            <span className=''>⭐️</span>
          </div>
          <div className='flex flex-row items-center gap-x-1 text-sm text-gray-400'>
            <MapPointIcon className='h-4 w-4' />
            49 rạp
          </div>
        </div>
      </div>
    </Link>
  );
}
