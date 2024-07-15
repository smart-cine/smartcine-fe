import { SearchInput } from '@/components/input/SearchInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListCinema } from '@/core/cinema/cinema.query';

import { ListCinema } from './list-cinema/ListCinema';

export function CinemaSearch() {
  const { data: cinemas = [] } = useListCinema();

  return (
    <>
      <div className='px-3 py-2'>
        <SearchInput
          placeholder='Tìm theo tên rạp ...'
          className='h-9 w-full'
        />
      </div>
      <ListCinema />
    </>
  );
}
