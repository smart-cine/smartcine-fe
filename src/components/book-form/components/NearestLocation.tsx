import { cn } from '@/lib/utils';
import { GeolocationIcon } from '@/components/icon/GeolocationIcon';
import { Button } from '@/components/ui/button';

export function NearestLocation({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <Button
      className={cn(
        'flex w-[100px] flex-row items-center gap-x-1 border border-gray-300 px-2',
        className
      )}
      variant='ghost'
    >
      <GeolocationIcon className='h-4 w-4' />
      <p className='font-semibold'>Gần bạn</p>
    </Button>
  );
}
