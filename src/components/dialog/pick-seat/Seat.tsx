import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/lib/utils';

import { usePickSeat } from './usePickSeat';

export function Seat({
  id,
  code,
  className,
}: {
  readonly id: string;
  readonly code: string;
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
        'm-2 flex min-h-12 min-w-12 cursor-pointer select-none items-center justify-center rounded-sm bg-red-400 transition-all duration-100',
        {
          'bg-yellow-400': isActive,
          'hover:bg-red-600': !isActive,
        },
        className
      )}
      onClick={handleClick}
    >
      {code}
    </div>
  );
}
