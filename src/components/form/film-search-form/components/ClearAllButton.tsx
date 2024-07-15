import { Button } from '@/components/ui/button';

import { useFilmSearchForm } from '../hooks/useFilmSearchForm';

export function ClearAllButton() {
  const hasFilters = useFilmSearchForm(
    (state) =>
      state.getCountries().length > 0 ||
      state.getTags().length > 0 ||
      state.getYears().length > 0
  );

  if (!hasFilters) return null;

  return (
    <Button className='h-full' variant='momo' disabled={!hasFilters}>
      Clear all
    </Button>
  );
}
