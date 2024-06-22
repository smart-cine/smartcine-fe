import Image from 'next/image';
import { CheckCircleIcon } from 'lucide-react';

export function CheckList({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className='flex flex-row flex-wrap justify-evenly gap-y-5'>
      <div className='flex grow flex-col justify-center gap-y-2'>
        <p className='mb-2 text-2xl font-bold text-[#b12572]'>
          Movie schedule on SmartCine
        </p>
        {children}
      </div>
      <Image
        src='/momo-home-showtimes.jpg'
        alt='momo home showtimes'
        width={350}
        height={350}
        className='grow rounded-md'
      />
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
    <div className='flex flex-row gap-x-1'>
      <div className='flex flex-row items-center'>
        <CheckCircleIcon className='h-5 w-5' />
      </div>
      <div className='flex flex-row items-center whitespace-pre-wrap'>
        {children}
      </div>
    </div>
  );
}
