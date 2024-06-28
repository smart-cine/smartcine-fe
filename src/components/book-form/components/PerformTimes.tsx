import { cn } from '@/lib/utils';

export function PerformTimes({ className }: { readonly className?: string }) {
  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      {['2D phụ đề', '2D Lồng Tiếng'].map((item) => (
        <div key={item} className='flex flex-col gap-y-1'>
          <div className='font-semibold'>{item}</div>
          <div className='flex flex-row gap-x-3'>
            {['17:40 ~ 19:45', '20:30 ~ 22:35'].map((item) => (
              <div
                key={item}
                className='cursor-pointer rounded-md border border-blue-500 px-4 py-1 text-blue-700'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
