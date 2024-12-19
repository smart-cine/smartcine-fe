import Image from 'next/image';
import { CheckCircle2Icon, DotIcon, ThumbsUpIcon } from 'lucide-react';
import ShowMoreText from 'react-show-more-text';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { CommentIcon } from '../icon/CommentIcon';
import { StarIcon } from '../icon/StarIcon';

export function Comment({
  className,
  comment,
}: {
  readonly className?: string;
  readonly comment: {
    id: string;
    body: string;
    account: {
      name: string;
      avatar_url: string;
    };
    children: Array<{ id: string }>;
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
        <div className='flex flex-col text-sm'>
          <div className='text-gray-800'>{comment.account.name}</div>
          <div className='flex items-center gap-x-2 text-sm text-gray-400'>
            <div>hôm qua</div>
            <div className='flex items-center gap-x-1 text-momo'>
              <CheckCircle2Icon className='h-4 w-4' />
              Đã mua qua momo
            </div>
          </div>
        </div>
        <div className='flex items-center gap-x-1 font-semibold text-gray-900'>
          <StarIcon className='h-5 w-5' />
          10/10
          <DotIcon className='h-2 w-2' />
          Cực phẩm!
        </div>
        <ShowMoreText
          className='whitespace-pre-wrap break-words text-[15px] leading-relaxed text-gray-900'
          lines={2}
          anchorClass='cursor-pointer hover:underline text-blue-500'
          more='Show more'
          less='Show less'
        >
          {comment.body}
        </ShowMoreText>

        <div className='my-2 flex items-center gap-x-2'>
          {['Đáng xem', 'Kịch tính', 'Hài hước'].map((tag) => (
            <div
              key={tag}
              className={cn(
                'whitespace-nowrap rounded-md px-2 py-1 text-sm leading-4 text-gray-800',
                'bg-blue-50'
              )}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className='flex items-center gap-x-5'>
          {comment.children.length && (
            <div className='flex items-center gap-x-1 text-sm text-gray-800'>
              <CommentIcon className='h-4 w-4' />
              {comment.children.length} bình luận
            </div>
          )}
          <div className='flex items-center gap-x-1'>
            <ThumbsUpIcon className='h-4 w-4' />
            <div className='text-sm text-neutral-700'>9 thấy hữu ích</div>
          </div>
        </div>
      </div>
    </div>
  );
}
