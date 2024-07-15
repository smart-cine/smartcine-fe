import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserComment({
  className,
  body,
}: {
  readonly className?: string;
  readonly body: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-row gap-x-2', className)}>
      <Avatar className='h-9 w-9'>
        <AvatarImage src='https://githusb.com/shadcn.png' />
        <AvatarFallback>
          <Image
            src='/avatar.png'
            width={36}
            height={36}
            alt='fallback-image'
          />
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-y-1'>
        <div className='flex flex-row gap-x-1 text-sm'>
          <div className='font-semibold'>Nguyễn Văn Đam</div>
          <div className='text-gray-400'>hôm qua</div>
        </div>
        <div className='text-sm'>{body}</div>
      </div>
    </div>
  );
}
