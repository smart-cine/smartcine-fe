import { cn } from '@/lib/utils';
import { useListDate } from '@/hooks/useListDate';

export function DatePicker({
  className,
  index,
  time,
}: {
  readonly className?: string;
  readonly index: number;
  readonly time: Date;
}) {
  const setSelectedIndex = useListDate((state) => state.setSelectedIndex);
  const isSelected = useListDate((state) => state.selectedIndex === index);

  return (
    <div
      className={cn(
        'flex min-w-[70px] cursor-pointer flex-col overflow-hidden rounded-sm border border-gray-300',
        {
          'border-momo': isSelected,
        },
        className
      )}
      onClick={() => {
        setSelectedIndex(index);
      }}
    >
      <div
        className={cn('bg-gray-100 px-6 py-2 text-center font-semibold', {
          'bg-momo text-gray-50': isSelected,
        })}
      >
        {time.getDate()}
      </div>
      <div className='p-1 text-center text-sm'>
        {index === 0
          ? 'Hôm nay'
          : ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][time.getDate() % 7]}
      </div>
    </div>
  );
}
