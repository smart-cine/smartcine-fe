import Image from 'next/image';
import { ArrowDownNarrowWide } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ArrowDownIcon } from '@/components/icon/ArrowDownIcon';
import { useReadCinema } from '@/core/cinema/cinema.query';

export function CinemaDescription({
  cinema_id,
  className,
  variant = 'default',
}: {
  readonly cinema_id: string;
  readonly className?: string;
  readonly variant?: 'default' | 'minimal';
}) {
  const { data: cinema } = useReadCinema(cinema_id);
  if (!cinema) return null;

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
      <div className='h-9 w-9 rounded-sm border border-gray-200'>
        <Image
          src={`/cinema/logo/${cinema.variant.toLowerCase()}.png`}
          alt='cinema-logo'
          width={36}
          height={36}
        />
      </div>
      <div className='flex w-full flex-col'>
        <p className='font-semibold'>{cinema.name}</p>
        <p className='text-sm font-thin text-gray-500'>
          Tầng 6, The Pegasus Plaza, số 53-55 Võ Thị Sáu, P.Quyết Thắng, TP Biên
          Hòa, Đồng Nai{' '}
          <a
            className='text-blue-500'
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
