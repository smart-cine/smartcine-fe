import Image from 'next/image';

import { CheckCircleIcon } from '@/components/icon/CheckCircle';
import { Button } from '@/components/ui/button';

export function CheckList({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='flex flex-row-reverse flex-wrap items-center justify-evenly gap-x-6 gap-y-5 md:flex-nowrap'>
      <Image
        src='/momo-home-showtimes.jpg'
        alt='momo home showtimes'
        width={350}
        height={350}
        className='h-full grow rounded-md'
      />
      <div className='flex grow flex-col justify-center gap-y-3'>
        <p className='mb-2 text-2xl font-bold text-[#b12572] md:text-3xl lg:text-4xl'>
          Movie schedule on SmartCine
        </p>
        {children}
        <Button variant='momo' className='mt-5 w-fit font-bold uppercase'>
          Book tickets now
        </Button>
      </div>
    </div>
  );
}

CheckList.Item = CheckListItem;
export function CheckListItem({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='flex flex-row gap-x-2'>
      <div className='flex flex-row items-center'>
        <CheckCircleIcon className='' />
      </div>
      <div className='text-md items-center whitespace-pre-wrap text-gray-600'>
        {children}
      </div>
    </div>
  );
}
