import { cn } from '@/lib/utils';
import { TopCommentCard } from '@/components/card/TopCommentCard';

export function TopComments({ className }: { readonly className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      <TopCommentCard />
      <TopCommentCard />
      <TopCommentCard />
    </div>
  );
}
