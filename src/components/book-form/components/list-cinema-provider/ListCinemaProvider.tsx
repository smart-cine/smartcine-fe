import { useMemo } from 'react';

import { cn, genericMemo } from '@/lib/utils';
import { useListCinemaProvider } from '@/core/cinema-provider/cinema-provider';
import { useListCinema } from '@/core/cinema/cinema.query';

import { CinemaProviderPicker } from './CinemaProviderPicker';
import { CinemaProviderPickerAll } from './CinemaProviderPickerAll';

function ListCinemaProvider({ className }: { readonly className?: string }) {
  const { data: cinema_providers = [] } = useListCinemaProvider();

  return (
    <div
      className={cn(
        'flex max-w-[100%] flex-row gap-x-5 overflow-auto py-2',
        className
      )}
    >
      <CinemaProviderPickerAll />
      {cinema_providers.map((cinema_provider) => (
        <CinemaProviderPicker
          key={cinema_provider.id}
          cinema_provider={cinema_provider}
        />
      ))}
    </div>
  );
}

export const MemoListCinemaProvider = genericMemo(ListCinemaProvider);
