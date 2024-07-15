import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const Indicator = forwardRef<
  HTMLDivElement,
  { readonly className?: string }
>(({ className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute hidden rounded-sm border border-momo bg-momo opacity-20',
      className
    )}
  />
));
Indicator.displayName = 'Indicator';
