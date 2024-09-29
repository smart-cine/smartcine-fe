import { useMemo } from 'react';
import { SearchIcon } from 'lucide-react';
import { debounce } from 'ts-debounce';

import { cn } from '@/lib/utils';
import { SearchInput as SearchInputRaw } from '@/components/input/SearchInput';

import { useBookForm } from '../../hooks/useBookForm';

export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const setSearchCinema = useBookForm((state) => state.setSearchCinema);
  const handleInput = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchCinema(e.target.value);
      }, 300),
    []
  );

  return (
    <SearchInputRaw className={className} {...props} onInput={handleInput} />
  );
}
