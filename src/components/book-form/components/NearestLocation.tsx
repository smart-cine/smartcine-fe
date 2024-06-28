import { GeolocationIcon } from '@/components/icon/GeolocationIcon';
import { Button } from '@/components/ui/button';

export function NearestLocation() {
  return (
    <Button
      className='flex w-[100px] flex-row items-center gap-x-1 border border-gray-300 px-2'
      variant='ghost'
    >
      <GeolocationIcon className='h-4 w-4' />
      <p className='font-semibold'>Gần bạn</p>
    </Button>
  );
}
