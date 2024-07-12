import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

import { useFilmSearchForm } from '../hooks/useFilmSearchForm';

export function DropdownItem({
  value,
  type,
}: {
  readonly value: string;
  readonly type: 'tag' | 'country' | 'year';
}) {
  const isChecked = useFilmSearchForm(
    (state) => state.tag[value] || state.country[value] || state.year[value]
  );
  const setValue = useFilmSearchForm((state) => {
    switch (type) {
      case 'tag':
        return state.setTag;
      case 'country':
        return state.setCountry;
      case 'year':
        return state.setYear;
    }
  });

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-row justify-between rounded-md p-1.5 text-sm text-gray-700 transition-all hover:bg-gray-100',
        {
          'bg-gray-100': isChecked,
        }
      )}
      onClick={() => {
        setValue(value, !isChecked);
      }}
    >
      {value}
      {isChecked && <CheckIcon className='h-4 w-4 text-momo' />}
    </div>
  );
}
