import { useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import ReactShowMoreText from 'react-show-more-text';

import { cn, youtube_parser } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useReadFilm } from '@/core/film/film.query';

import { MinimalFilmCard } from '../card/MinimalFilmCard';
import { Button } from '../ui/button';

export function TrailerTrigger({
  className,
  children,
  film_id,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly film_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        // send a click event to next tick
        setTimeout(() => {
          // @ts-expect-error
          document.querySelector('.lty-playbtn')?.click();
        });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'max-w-4xl overflow-hidden rounded-sm border-none bg-[#161617] p-0',
          className
        )}
      >
        <div className='w-full'>
          <LiteYouTubeEmbed
            id={film.trailer_url ? youtube_parser(film.trailer_url) : ''}
            title='What’s new in Material Design for the web (Chrome Dev Summit 2019)'
            aspectHeight={300}
            iframeClass='w-full h-[432px] top-0'
          />
        </div>
        <DialogFooter className='h-[180px] px-6'>
          <div className='flex h-full w-full flex-row gap-x-5'>
            <MinimalFilmCard
              film_id={film.id}
              className='max-w-[80px]'
              hasPlayButton={false}
            />
            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-row gap-x-1'>
                <p className='text-xl font-bold text-white'>{film.title}</p>
                <p className='line-clamp-3 self-end text-sm text-white text-opacity-70'>
                  - {film.tags.join(', ')}
                </p>
              </div>
              <ReactShowMoreText
                className='text-sm text-gray-400'
                lines={1}
                anchorClass='cursor-pointer text-yellow-400'
                more='Show more'
                less='Show less'
              >
                {film.description}
              </ReactShowMoreText>
              <div className='flex flex-row gap-x-3'>
                <Button variant='momo' className='h-8'>
                  Đặt vé
                </Button>
                <Button
                  variant='secondary'
                  className='h-8'
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
