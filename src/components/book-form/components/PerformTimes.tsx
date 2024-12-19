import { memo, useCallback, useMemo, useState } from 'react';
import moment from 'moment';

import { cn, genericMemo } from '@/lib/utils';
import { PickSeatDialog } from '@/components/dialog/pick-seat/PickSeatDialog';
import { type TPerform } from '@/core/perform/perform.type';

function TimeButton({
  perform,
  onClick,
}: {
  readonly perform: TPerform;
  readonly onClick: (perform: TPerform) => void;
}) {
  return (
    <button
      className={cn(
        'whitespace-nowrap rounded-sm border border-sky-400 px-4 py-1 text-sky-600 hover:border-sky-700'
      )}
      onClick={() => {
        onClick(perform);
      }}
    >
      {moment(perform.start_time).format('HH:mm')} ~{' '}
      {moment(perform.end_time).format('HH:mm')}
    </button>
  );
}

export const MemoTimeButton = genericMemo(TimeButton);

export function PerformTimes({
  className,
  performs = [],
}: {
  readonly className?: string;
  readonly performs: TPerform[];
}) {
  const [selectedPerform, setSelectedPerform] = useState<
    TPerform | undefined
  >();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groupByVewTranslate = useMemo(() => {
    const result = new Map<string, TPerform[]>();
    performs.forEach((perform) => {
      const key = `${perform.view_type} ${perform.translate_type}`;
      if (!result.has(key)) {
        result.set(key, []);
      }

      result.get(key)?.push(perform);
    });
    return result;
  }, [performs]);

  const handleTimeClick = useCallback((perform: TPerform) => {
    setSelectedPerform(perform);
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <div className={cn('flex flex-col gap-y-3', className)}>
        {Array.from(groupByVewTranslate).map(
          ([key, performs]) =>
            performs.length > 0 && (
              <div key={key} className='flex flex-col gap-y-1'>
                <div className='font-semibold'>{key}</div>
                <div className='flex flex-row flex-wrap gap-3'>
                  {performs.map((perform) => (
                    <MemoTimeButton
                      key={perform.id}
                      perform={perform}
                      onClick={handleTimeClick}
                    />
                  ))}
                </div>
              </div>
            )
        )}
      </div>

      {selectedPerform && (
        <PickSeatDialog
          className='hidden'
          perform={selectedPerform}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}
