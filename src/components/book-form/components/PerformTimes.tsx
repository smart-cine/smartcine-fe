import { useMemo } from 'react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { PickSeatDialog } from '@/components/dialog/pick-seat/PickSeatDialog';
import { type TPerform } from '@/core/perform/perform.type';

export function PerformTimes({
  className,
  performs = [],
}: {
  readonly className?: string;
  readonly performs: TPerform[];
}) {
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

  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      {Array.from(groupByVewTranslate).map(
        ([key, performs]) =>
          performs.length > 0 && (
            <div key={key} className='flex flex-col gap-y-1'>
              <div className='font-semibold'>{key}</div>
              <div className='flex flex-row flex-wrap gap-3'>
                {performs.map((perform) => (
                  <PickSeatDialog key={perform.id} perform={perform}>
                    {moment(perform.start_time).format('HH:mm')} ~{' '}
                    {moment(perform.end_time).format('HH:mm')}
                  </PickSeatDialog>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
