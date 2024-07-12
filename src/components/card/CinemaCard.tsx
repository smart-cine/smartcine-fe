import { TagIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { MapPointIcon } from '../icon/MapPointIcon';

export function CinemaCard({
  className,
  cinema,
}: {
  readonly className?: string;
  readonly cinema: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[150px] cursor-pointer flex-row flex-wrap items-center gap-x-5 rounded-md border border-gray-200 p-3 shadow-sm duration-100 hover:shadow-md',
        className
      )}
    >
      <div className='h-[60px] w-[100px] border border-gray-400' />
      <div className='flex flex-col gap-y-1'>
        <p className='text-lg font-bold text-momo'>{cinema}</p>
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
  );
}
