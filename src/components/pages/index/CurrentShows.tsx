import { cn } from '@/lib/utils';
import { FilmCard } from '@/components/card/FilmCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useListPerform } from '@/core/perform/perform.query';

export function CurrentShows({
  className,
  variant = 'black',
  hasIndex = true,
}: {
  readonly className?: string;
  readonly variant?: 'black' | 'white';
  readonly hasIndex?: boolean;
}) {
  const { data: performs = [] } = useListPerform();
  if (!performs.length) return null;

  return (
    <div
      className={cn(
        'flex flex-col gap-y-6 px-6',
        {
          'bg-black': variant === 'black',
          'bg-white': variant === 'white',
        },
        className
      )}
    >
      <div className='flex flex-col items-center justify-between gap-y-3 bg-transparent p-6'>
        <Carousel
          className={cn('w-full max-w-6xl', className)}
          opts={{ loop: false, dragFree: true }}
        >
          <CarouselContent>
            {performs.map((perform, index) => (
              <CarouselItem
                key={perform.id}
                className='h-[380px] basis-1/2 md:basis-1/3 lg:basis-1/5'
              >
                <div className='h-full p-1'>
                  <FilmCard
                    hasPlayButton
                    imageClass='h-[300px]'
                    film_id={perform.film_id}
                    index={hasIndex ? index + 1 : undefined}
                    variant={variant}
                  />
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
