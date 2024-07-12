import Image from 'next/image';

import { cn, genericMemo } from '@/lib/utils';

export const ConstrainedContainer = genericMemo<
  React.FC<{
    children: React.ReactNode;
    className?: string;
    contentClass?: string;
    background?: string;
  }>
>(({ children, className, contentClass, background }) => (
  <div className='relative'>
    {background && (
      <div className='absolute -z-10 h-full w-full overflow-hidden brightness-[0.2] filter'>
        <Image
          width={5000}
          height={5000}
          src={background}
          className='min-h-full bg-black object-contain object-top'
          alt='film background'
        />
      </div>
    )}
    <div className={cn('w-full px-4 sm:px-6 lg:px-8', className)}>
      <div className={cn('mx-auto max-w-6xl', contentClass)}>{children}</div>
    </div>
  </div>
));
ConstrainedContainer.displayName = 'ConstrainedContainer';
