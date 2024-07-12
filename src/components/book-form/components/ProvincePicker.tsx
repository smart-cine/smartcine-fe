import { ShieldCloseIcon } from 'lucide-react';
import { Drawer } from 'vaul';

import { province } from '@/lib/fake/province';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function ProvincePicker({ className }: { readonly className?: string }) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className='flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 sm:justify-between md:flex-nowrap md:px-10'>
        <p className='text-xl font-bold'>Chọn địa điểm</p>
        <Input className='h-8 max-w-64' placeholder='Tìm địa điểm ...' />
      </div>
      <Separator orientation='horizontal' />
      <div className='flex flex-col overflow-auto max-lg:max-h-[calc(100vh-300px)]'>
        <div className='grid grid-cols-2 px-6 text-black md:grid-cols-3 md:gap-3 md:px-10 lg:grid-cols-4'>
          {province.map((p) => (
            <div
              key={p}
              className='cursor-pointer p-2 hover:border-momo hover:bg-gray-400 hover:text-momo'
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      <div className='grow' />
      <Separator orientation='horizontal' />
      <div className='flex w-full justify-end self-end p-3'>
        <Button variant='momo' className='text-md h-8 font-semibold'>
          Đóng
        </Button>
      </div>
    </div>
  );
}
