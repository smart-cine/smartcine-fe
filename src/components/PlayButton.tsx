import { useCallback } from 'react';

import { cn } from '@/lib/utils';
import { type TFilm } from '@/core/film/film.type';

import { TrailerTrigger } from './dialog/TrailerTrigger';
import { PlayIcon } from './icon/PlayIcon';

export function PlayButton({
  className,
  onClick,
  film_id,
}: {
  readonly className?: string;
  readonly onClick?: () => void;
  readonly film_id: string;
}) {
  const playClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <TrailerTrigger film_id={film_id}>
      <div className='w-full' onClick={playClick}>
        <PlayIcon
          className={cn(
            'mx-auto h-10 w-10 cursor-pointer duration-200 hover:scale-[110%]',
            className
          )}
        />
      </div>
    </TrailerTrigger>
  );
}
