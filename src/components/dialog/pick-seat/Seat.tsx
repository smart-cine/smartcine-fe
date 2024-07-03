import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/lib/utils';

import { usePickSeat } from './usePickSeat';

export function Seat({
  id,
  className,
}: {
  readonly id: string;
  readonly className?: string;
}) {
  const { isActive, setSeat } = usePickSeat(
    useShallow((state) => ({
      isActive: Boolean(state.seats[id]),
      setSeat: state.setSeat,
    }))
  );
  const handleClick = useCallback(() => {
    if (id) {
      setSeat(id);
    }
  }, [id, setSeat]);

  return (
    <div
      className={cn(
        'm-2 flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-sm bg-red-400 hover:bg-red-600',
        {
          'bg-yellow-400': isActive,
        },
        className
      )}
      onClick={handleClick}
    >
      {id}
    </div>
  );
}
