import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn, genericMemo } from '@/lib/utils';
import {
  useCreatePickseat,
  useDeletePickseat,
} from '@/core/pickseat/pickseat.query';

import { usePickSeat } from './usePickSeat';

export function Seat({
  id,
  perform_id,
  code,
  color_code,
  className,
}: {
  readonly id: string;
  readonly perform_id: string;
  readonly code: string;
  readonly color_code: string;
  readonly className?: string;
}) {
  const { mutateAsync: mutateDeleteSeat } = useDeletePickseat();
  const { mutateAsync: mutateCreateSeat } = useCreatePickseat();

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

  useEffect(() => {
    if (isActive) {
      mutateCreateSeat({ perform_id, layout_seat_id: id }).catch(console.error);
    } else {
      // TODO: tao query delete pick seat moi
      // mutateDeleteSeat(id, perform_id).catch(console.error);
    }
  }, [isActive]);

  return (
    <div
      className={cn(
        'm-2 flex min-h-12 min-w-12 cursor-pointer select-none items-center justify-center rounded-md border-gray-100 transition-all duration-200',
        {
          'border-2': isActive,
          'hover:bg-red-600': !isActive,
        },
        className
      )}
      style={{ backgroundColor: color_code }}
      onClick={handleClick}
    >
      {code}
    </div>
  );
}

export const MemoSeat = genericMemo(Seat);
