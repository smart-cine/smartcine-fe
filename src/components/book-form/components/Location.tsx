import { ArrowDownWideNarrowIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MapPointIcon } from '@/components/icon/MapPointIcon';
import { Button } from '@/components/ui/button';

export function Location({ className }: { readonly className?: string }) {
  return (
    <Button
      variant='ghost'
      className={cn(
        'flex w-[200px] flex-row justify-start gap-x-1 border border-pink-500 px-2 text-momo',
        className
      )}
    >
      <MapPointIcon className='h-4 w-4' />
      <p className='text-momo'>Đồng Nai</p>
      <div className='flex grow justify-end'>
        <ArrowDownWideNarrowIcon />
      </div>
    </Button>
  );
}
