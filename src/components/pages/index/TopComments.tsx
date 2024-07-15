import { cn } from '@/lib/utils';
import { TopCommentCard } from '@/components/card/TopCommentCard';
import { useListFilm } from '@/core/film/film.query';

export function TopComments({ className }: { readonly className?: string }) {
  const { data: films = [] } = useListFilm();
  if (!films.length) return null;
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      <TopCommentCard film_id={films[0].id} />
      <TopCommentCard film_id={films[1].id} />
      <TopCommentCard film_id={films[2].id} />
    </div>
  );
}
