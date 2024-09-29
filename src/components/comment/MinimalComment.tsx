import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useReadComment } from '@/core/comment/comment.query';
import { useReadUser } from '@/core/user/user.query';

export function MinimalComment({
  className,
  id,
}: {
  readonly className?: string;
  readonly id: string;
}) {
  const { data: comment } = useReadComment(id);
  const { data: user } = useReadUser(comment?.account_id);
  if (!comment || !user) return null;

  return (
    <div className={cn('flex flex-row gap-x-2', className)}>
      <Avatar className='h-9 w-9'>
        <AvatarImage src={user.avatar_url} />
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
          <div className='font-semibold'>{user.name}</div>
          <div className='text-gray-400'>hôm qua</div>
        </div>
        <div className='text-sm'>{comment.body}</div>
      </div>
    </div>
  );
}
