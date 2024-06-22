import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type FilmDetail } from '@/core/film/film.type';

export function CurrentShows({
  films,
  className,
}: {
  readonly films: FilmDetail[];
  readonly className?: string;
}) {
  return (
    <div className='flex flex-col gap-y-6 bg-black py-6'>
      <div className='flex flex-col items-center justify-between gap-y-3 px-6'>
        <h1 className='text-2xl font-bold'>Phim đang chiếu</h1>
        <Carousel
          className={cn('w-full max-w-6xl', className)}
          opts={{ loop: false, dragFree: true }}
        >
          <CarouselContent>
            {films.map((film, index) => (
              <CarouselItem key={film.id} className='basis-1/3'>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      {/* <PosterFilm data={film} /> */}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='flex flex-row gap-x-6 overflow-x-auto' />
    </div>
  );
}
