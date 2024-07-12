import { cn } from '@/lib/utils';
import { ListAreaModal } from '@/components/drawer-dialog/ListAreaModal';
import { ArrowDownIcon } from '@/components/icon/ArrowDownIcon';
import { MapPointIcon } from '@/components/icon/MapPointIcon';
import { Button } from '@/components/ui/button';

import { useBookForm } from '../hooks/useBookForm';

export function Location({ className }: { readonly className?: string }) {
  const selectedArea = useBookForm((state) => state.selectedArea);

  return (
    <ListAreaModal
      className={cn(
        'flex h-[40px] w-[200px] cursor-pointer flex-row items-center rounded-sm border border-pink-500 px-2 text-momo',
        className
      )}
    >
      <MapPointIcon className='h-4 w-4' />
      <p className='ml-1 text-sm font-semibold text-momo'>{selectedArea}</p>
      <div className='flex grow justify-end'>
        <ArrowDownIcon className='h-4 w-4' />
      </div>
    </ListAreaModal>
  );
}
