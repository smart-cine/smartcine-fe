import { cn } from '@/lib/utils';
import { useListCinema } from '@/core/cinema/cinema.query';

export function ListCinema({ className }: { readonly className?: string }) {
  const { data: cinemas = [] } = useListCinema();

  return (
    <div
      className={cn(
        'flex max-w-[100%] flex-row gap-x-5 overflow-auto py-2',
        className
      )}
    >
      {cinemas.map((cinema) => (
        <div
          key={cinema.id}
          className='flex w-[50px] flex-col items-center justify-center gap-y-2'
        >
          <div className='h-12 w-12 rounded-md border border-gray-200 p-2' />
          <p className='line-clamp-1 text-sm text-gray-500'>{cinema.name}</p>
        </div>
      ))}
    </div>
  );
}
