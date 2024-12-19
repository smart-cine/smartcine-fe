import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MinimalComment({
  className,
  comment,
}: {
  readonly className?: string;
  readonly comment: {
    readonly id: string;
    readonly account: {
      name: string;
      avatar_url: string;
    };
    readonly body: string;
  };
}) {
  return (
    <div className={cn('flex flex-row gap-x-2', className)}>
      <Avatar className='h-9 w-9'>
        <AvatarImage src={comment.account.avatar_url} />
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
          <div className='font-semibold'>{comment.account.name}</div>
          <div className='text-gray-400'>hôm qua</div>
        </div>
        <div className='text-sm'>{comment.body}</div>
      </div>
    </div>
  );
}
