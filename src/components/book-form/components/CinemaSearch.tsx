import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useListCinema } from '@/core/cinema/cinema.query';

import { ListCinema } from './list-cinema/ListCinema';

export function CinemaSearch() {
  const { data: cinemas = [] } = useListCinema();

  return (
    <>
      <div className='bg-gray-50 px-3 py-2'>
        <Input placeholder='Tìm theo tên rạp ...' className='h-10 w-full p-2' />
      </div>
      <ListCinema />
      {/* <div className='flex flex-col overflow-y-auto'>
        {cinemas.map((cinema) => (
          <Button
            key={cinema.id}
            className='flex h-[50px] w-full flex-row justify-start gap-x-3 rounded-none'
            variant='ghost'
          >
            <div className='h-9 w-9 rounded-md border border-gray-200 p-2' />
            <p className='font-normal'>{cinema.name}</p>
          </Button>
        ))}
      </div> */}
    </>
  );
}
