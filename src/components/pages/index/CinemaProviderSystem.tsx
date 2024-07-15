import { cinemaProviders } from '@/lib/fake/cinema-providers';
import { cn } from '@/lib/utils';
import { CinemaProviderCard } from '@/components/card/CinemaProviderCard';

export function CinemaProviderSystem({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <div
      className={cn('mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}
    >
      {cinemaProviders.map((provider) => (
        <CinemaProviderCard key={provider} provider={provider} />
      ))}
    </div>
  );
}
