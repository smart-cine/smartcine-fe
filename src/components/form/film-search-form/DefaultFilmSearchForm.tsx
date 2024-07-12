import { countries } from '@/lib/fake/countries';
import { tags } from '@/lib/fake/tags';
import { FilmCard } from '@/components/card/FilmCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useListFilm } from '@/core/film/film.query';

import { SelectDropdown } from './components/SelectDropdown';

export function DefaultFilmSearchForm() {
  const { data: films = [] } = useListFilm();

  return (
    <div className='flex flex-col gap-y-8'>
      <div className='flex flex-row justify-between'>
        <p className='w-fit text-2xl font-bold text-pink-600'>
          Find films on SmartCine
        </p>
        <div className='flex flex-row gap-x-4'>
          <SelectDropdown type='tag' title='Thể loại' items={tags} />
          <SelectDropdown type='country' title='Quốc gia' items={countries} />
          <SelectDropdown
            type='year'
            title='Năm'
            items={Array.from({ length: 20 }, (_, i) =>
              String(new Date().getFullYear() - i)
            )}
          />
          <Input className='h-9' placeholder='Search film' />
        </div>
      </div>

      <div className='flex flex-row flex-wrap gap-6'>
        {films.map((film) => (
          <FilmCard
            key={film.id}
            hasPlayButton
            variant='white'
            film_id={film.id}
            className='w-[200px]'
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive href='#'>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>99</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
