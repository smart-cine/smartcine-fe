import { ArrowDownNarrowWide } from 'lucide-react';

import { cn } from '@/lib/utils';

export function CinemaDescription({
  cinema,
  className,
  variant = 'default',
}: {
  readonly cinema: string;
  readonly className?: string;
  readonly variant?: 'default' | 'minimal';
}) {
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
      <div className='h-8 w-8 rounded-sm border border-black' />
      <div className='flex w-full flex-col'>
        <p className='font-semibold'>{cinema}</p>
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
      {variant === 'minimal' && <ArrowDownNarrowWide className='h-5 w-5' />}
    </div>
  );
}
