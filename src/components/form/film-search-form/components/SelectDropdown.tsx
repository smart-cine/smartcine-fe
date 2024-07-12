import * as React from 'react';
import { type DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ArrowDownIcon } from '../../../icon/ArrowDownIcon';
import { useFilmSearchForm } from '../hooks/useFilmSearchForm';
import { DropdownItem } from './DropdownItem';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function SelectDropdown({
  title,
  items = [],
  type,
}: {
  readonly title: string;
  readonly items?: string[];
  readonly type: 'tag' | 'country' | 'year';
}) {
  const reset = useFilmSearchForm((state) => {
    switch (type) {
      case 'tag':
        return state.resetTag;
      case 'country':
        return state.resetCountry;
      case 'year':
        return state.resetYear;
    }
  });
  const length = useFilmSearchForm((state) => {
    switch (type) {
      case 'tag':
        return state.getTags().length;
      case 'country':
        return state.getCountries().length;
      case 'year':
        return state.getYears().length;
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex h-9 min-w-32 items-center justify-between px-2 font-normal'
        >
          {title}
          {length > 0 && ` (${length})`}
          <ArrowDownIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[600px]'>
        <DropdownMenuLabel className='flex items-center justify-between px-4'>
          {title}

          <Button className='h-6' variant='momo' onClick={reset}>
            Clear all
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          className={cn(
            'grid max-h-[40vh] select-none grid-cols-3 gap-x-2 gap-y-1 overflow-auto p-2',
            {
              'grid-cols-3': type === 'tag' || type === 'country',
              'grid-cols-1': type === 'year',
            }
          )}
        >
          {items.map((item) => (
            <DropdownItem key={item} value={item} type={type} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
