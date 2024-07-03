import { cn } from '@/lib/utils';
import { PickSeatDialog } from '@/components/dialog/pick-seat/PickSeatDialog';
import { useReadFilm } from '@/core/film/film.query';
import { type TFilm } from '@/core/film/film.type';

export function PerformTimes({
  className,
  film_id,
}: {
  readonly className?: string;
  readonly film_id: string;
}) {
  const { data: film } = useReadFilm(film_id);

  if (!film) return null;

  return (
    <div className={cn('flex flex-col gap-y-3', className)}>
      {['2D phụ đề', '2D Lồng Tiếng'].map((item) => (
        <div key={item} className='flex flex-col gap-y-1'>
          <div className='font-semibold'>{item}</div>
          <div className='flex flex-row gap-x-3'>
            {['17:40 ~ 19:45', '20:30 ~ 22:35'].map((item) => (
              <PickSeatDialog key={item} film_id={film.id}>
                {item}
              </PickSeatDialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
