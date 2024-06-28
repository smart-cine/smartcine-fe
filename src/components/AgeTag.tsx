import { cn } from '@/lib/utils';

export function AgeTag({
  className,
  restrictAge,
}: {
  readonly className?: string;
  readonly restrictAge: number;
}) {
  return (
    <div
      className={cn(
        'max-w-fit rounded-sm p-0.5 px-1 text-xs font-semibold text-gray-100 text-opacity-95',
        {
          'bg-red-500': restrictAge <= 18,
          'bg-yellow-500': restrictAge <= 16,
          'bg-green-500': restrictAge <= 13,
          'bg-blue-500': restrictAge <= 10,
        },
        className
      )}
    >
      {restrictAge}+
    </div>
  );
}
