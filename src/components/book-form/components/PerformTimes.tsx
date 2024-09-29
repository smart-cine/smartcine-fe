import { useMemo } from 'react';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { PickSeatDialog } from '@/components/dialog/pick-seat/PickSeatDialog';
import { useReadFilm } from '@/core/film/film.query';
import { useListPerform } from '@/core/perform/perform.query';
import { type TPerform } from '@/core/perform/perform.type';

export function PerformTimes({
  className,
  film_id,
  cinema_id,
}: {
  readonly className?: string;
  readonly film_id: string;
  readonly cinema_id: string;
}) {
  const { data: film } = useReadFilm(film_id);
  const { data: performs = [] } = useListPerform({
    cinema_id,
    limit: 5,
  });
  const groupByVewTranslate = useMemo(() => {
    const result = new Map<string, TPerform[]>();
    performs.forEach((perform) => {
      const key = `${perform.view_type} ${perform.translate_type}`;
      if (!result.has(key)) {
        result.set(key, []);
      }

      if (perform.film_id !== film_id) return;

      result.get(key)?.push(perform);
    });
    return result;
  }, [film_id, performs]);

  if (!film) return null;

  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      {Array.from(groupByVewTranslate).map(
        ([key, performs]) =>
          performs.length > 0 && (
            <div key={key} className='flex flex-col gap-y-1'>
              <div className='font-semibold'>{key}</div>
              <div className='flex flex-row gap-x-3'>
                {performs.map((perform) => (
                  <PickSeatDialog key={perform.id} perform_id={perform.id}>
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
