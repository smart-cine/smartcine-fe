import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';
import { useReadFilm } from '@/core/film/film.query';

import { PlayButton } from '../PlayButton';

export function MinimalFilmCard({
  className,
  imageClass,
  film_id,
  hasPlayButton = false,
}: {
  readonly className?: string;
  readonly film_id: string;
  readonly hasPlayButton?: boolean;
  readonly imageClass?: string;
}) {
  const { data: film } = useReadFilm(film_id);

  return (
    <div className={cn('relative h-fit overflow-hidden', className)}>
      <Image
        src={film?.picture_url ?? NOT_FOUND_PICTURE.FILM}
        width={5000}
        height={5000}
        alt='film background'
        className={cn(
          'aspect-[7/10] w-full object-cover object-top',
          imageClass
        )}
      />
      {hasPlayButton && film && (
        <PlayButton
          hasBorder
          hasTrailerTrigger
          className='h-14 w-14'
          film_id={film.id}
        />
      )}
    </div>
  );
}
