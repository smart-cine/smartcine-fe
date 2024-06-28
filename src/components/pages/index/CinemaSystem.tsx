import { cn } from '@/lib/utils';
import { CinemaCard } from '@/components/card/CinemaCard';

export function CinemaSystem({ className }: { readonly className?: string }) {
  return (
    <div
      className={cn('mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}
    >
      {['CGV', 'BHD', 'Galaxy', 'Lotte', 'MegaGS'].map((cinema) => (
        <CinemaCard key={cinema} cinema={cinema} />
      ))}
    </div>
  );
}
