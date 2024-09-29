import { cn } from '@/lib/utils';
import { CinemaProviderCard } from '@/components/card/CinemaProviderCard';
import { useListCinemaProvider } from '@/core/cinema-provider/cinema-provider';

export function CinemaProviderSystem({
  className,
}: {
  readonly className?: string;
}) {
  const { data: cinema_providers } = useListCinemaProvider();

  return (
    <div
      className={cn('mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2', className)}
    >
      {cinema_providers?.map((cinema_provider) => (
        <CinemaProviderCard key={cinema_provider.id} id={cinema_provider.id} />
      ))}
    </div>
  );
}
