import { useCallback } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { PlayButton } from '../PlayButton';

export function MinimalFilmCard({
  className,
  pictureUrl,
  onClick,
}: {
  readonly className?: string;
  readonly pictureUrl: string;
  readonly onClick?: () => void;
}) {
  const playClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={pictureUrl}
        width={5000}
        height={5000}
        alt='film background'
        className='w-full object-cover object-top'
      />
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
        <PlayButton onClick={playClick} />
      </div>
    </div>
  );
}
