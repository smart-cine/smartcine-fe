import Image from 'next/image';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { cn } from '@/lib/utils';

import { PlayButton } from '../PlayButton';

export function MinimalFilmCard({
  className,
  imageClass,
  hasPlayButton = false,
  film,
}: {
  readonly className?: string;
  readonly hasPlayButton?: boolean;
  readonly imageClass?: string;
  readonly film: {
    title: string;
    description: string;
    picture_url?: string;
    trailer_url?: string;
    tags: string[];
  };
}) {
  return (
    <div className={cn('relative h-fit overflow-hidden', className)}>
      <Image
        src={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
        width={5000}
        height={5000}
        alt='film background'
        className={cn(
          'aspect-[7/10] w-full object-cover object-top',
          imageClass
        )}
      />
      {hasPlayButton && (
        <PlayButton
          hasBorder
          hasTrailerTrigger
          className='h-14 w-14'
          film={film}
        />
      )}
    </div>
  );
}
