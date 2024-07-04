import { cn } from '@/lib/utils';

import { useBookForm } from '../../hooks/useBookForm';

export function DatePicker({
  className,
  index,
  time,
}: {
  readonly className?: string;
  readonly index: number;
  readonly time: Date;
}) {
  const setSelectedDate = useBookForm((state) => state.setSelectedDate);
  const isSelected = useBookForm((state) => state.selectedDate === index);

  return (
    <div
      className={cn(
        'flex min-w-[70px] cursor-pointer flex-col overflow-hidden rounded-sm border border-gray-300 transition-all',
        {
          'border-momo text-momo': isSelected,
        },
        className
      )}
      onClick={() => {
        setSelectedDate(index);
      }}
    >
      <div
        className={cn(
          'bg-gray-100 px-6 py-2 text-center font-semibold transition-all',
          {
            'bg-momo text-gray-50': isSelected,
          }
        )}
      >
        {time.getDate()}
      </div>
      <div className='p-1 text-center text-xs'>
        {index === 0
          ? 'Hôm nay'
          : ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][
              time.getDate() % 7
            ]}
      </div>
    </div>
  );
}
