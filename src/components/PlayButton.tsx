import { useCallback } from 'react';

import { cn } from '@/lib/utils';

import { PlayIcon } from './icon/PlayIcon';

export function PlayButton({
  className,
  onClick,
}: {
  readonly className?: string;
  readonly onClick?: () => void;
}) {
  const playClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div className='w-full' onClick={playClick}>
      <PlayIcon
        className={cn(
          'mx-auto h-10 w-10 cursor-pointer duration-200 hover:scale-[110%]',
          className
        )}
      />
    </div>
  );
}
