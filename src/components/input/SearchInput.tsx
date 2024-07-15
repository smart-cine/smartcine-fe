import { SearchIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-x-2 overflow-hidden rounded-sm border border-gray-200 bg-gray-50 pl-3 pr-2',
        className
      )}
    >
      <input
        type='text'
        className='h-full w-full bg-gray-50 text-sm text-black'
        placeholder='Search...'
        {...props}
      />
      <SearchIcon className='h-4 w-4 text-gray-600' />
    </div>
  );
}
