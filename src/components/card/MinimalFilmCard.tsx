import { useCallback } from 'react';
import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';
import { type TFilm } from '@/core/film/film.type';

import { PlayButton } from '../PlayButton';

export function MinimalFilmCard({
  className,
  film_id,
  onClick,
  hasPlayButton = true,
}: {
  readonly className?: string;
  readonly film_id: string;
  readonly onClick?: () => void;
  readonly hasPlayButton?: boolean;
}) {
  const { data: film } = useReadFilm(film_id);

  const playClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div className={cn('relative h-fit overflow-hidden', className)}>
      <Image
        src={film?.picture_url ?? NOT_FOUND_PICTURE.FILM}
        width={5000}
        height={5000}
        alt='film background'
        className='w-full object-cover object-top'
      />
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
        {hasPlayButton && film && (
          <PlayButton
            hasBorder
            className='h-14 w-14'
            film_id={film.id}
            onClick={playClick}
          />
        )}
      </div>
    </div>
  );
}
