import { cn } from '@/lib/utils';

export function UserComment({
  className,
  body,
}: {
  readonly className?: string;
  readonly body: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-row gap-x-2', className)}>
      <div className='h-8 w-8 rounded-full border border-gray-400' />
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
