import { useCallback } from 'react';

import { cn } from '@/lib/utils';
import { type TFilm } from '@/core/film/film.type';

import { TrailerTrigger } from './dialog/TrailerTrigger';
import { PlayIcon } from './icon/PlayIcon';

export function PlayButton({
  className,
  onClick,
  film_id,
  hasTrailerTrigger = true,
  hasBorder = false,
}: {
  readonly className?: string;
  readonly onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  readonly film_id: string;
  readonly hasTrailerTrigger?: boolean;
  readonly hasBorder?: boolean;
}) {
  return hasTrailerTrigger ? (
    <TrailerTrigger film_id={film_id}>
      <Button hasBorder={hasBorder} className={className} onClick={onClick} />
    </TrailerTrigger>
  ) : (
    <Button hasBorder={hasBorder} className={className} onClick={onClick} />
  );
}

function Button({
  onClick,
  className,
  hasBorder,
}: {
  readonly onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  readonly className?: string;
  readonly hasBorder?: boolean;
}) {
  return (
    <div className={cn('w-full')}>
      <PlayIcon
        className={cn(
          'mx-auto h-10 w-10 cursor-pointer text-white duration-200 hover:scale-[110%]',
          {
            'rounded-full border-2 border-white bg-black bg-opacity-25':
              hasBorder,
          },
          className
        )}
        onClick={onClick}
      />
    </div>
  );
}
