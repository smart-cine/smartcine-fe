import { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';

export function ScrollToTop({
  className,
  onClick,
}: {
  readonly className?: string;
  readonly onClick?: () => void;
}) {
  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick?.();
  }, [onClick]);

  return (
    <div
      className={cn(
        'fixed bottom-10 right-10 z-50 h-10 w-10 cursor-pointer rounded-full border border-gray-300 bg-white shadow-sm',
        className
      )}
      onClick={handleClick}
    >
      <div className='flex h-full w-full items-center justify-center'>
        <ArrowUp className='h-5 w-5' />
      </div>
    </div>
  );
}
