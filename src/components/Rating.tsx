import { cn } from '@/lib/utils';

import { StarIcon } from './icon/StarIcon';

export function StarRating({
  rating,
  className,
  amount,
}: {
  readonly rating: number;
  readonly className?: string;
  readonly amount?: number;
}) {
  return (
    <div className={cn('flex flex-row items-center gap-x-1', className)}>
      <StarIcon className='h-7 w-7' />
      <p>{rating}</p>
      <div className='flex flex-col text-[10px] font-light leading-[10px] text-gray-400'>
        <p>{amount}</p>
        <p>đánh giá</p>
      </div>
    </div>
  );
}
