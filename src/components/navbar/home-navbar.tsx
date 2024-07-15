import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { CameraIcon } from '../icon/CameraIcon';
import { Logo } from '../icon/Logo';
import { ModeToggle } from '../other/ModeToggle';
import { Separator } from '../ui/separator';

export const Navbar = forwardRef<
  HTMLUListElement,
  {
    readonly className?: string;
    readonly children?: React.ReactNode;
  }
>(({ className, children }, ref) => (
  <div
    className={cn(
      'mx-auto flex h-[65px] flex-row items-center border-b-[2px] bg-white px-4 py-2 shadow-sm lg:px-24',
      className
    )}
  >
    <div className='flex w-full flex-row'>
      <Link href='/' className='flex items-center'>
        <div className='flex flex-row items-center gap-x-2.5'>
          <Logo className='h-11 w-11' />
          <Separator orientation='vertical' className='min-h-7' />
          <CameraIcon className='h-9 w-9' />
          <p className='text-sm font-semibold leading-4 text-momo'>
            Đặt vé
            <br />
            xem phim
          </p>
        </div>
      </Link>
      <div className='grow' />
      <div className='hidden flex-row lg:flex'>
        <NavigationMenu>
          <NavigationMenuList ref={ref}>{children}</NavigationMenuList>
        </NavigationMenu>
      </div>
      <ModeToggle className='ml-1' />
    </div>
    <div className='flex w-full flex-row justify-end lg:hidden'>
      <MenuIcon className='h-6 w-6' />
    </div>
  </div>
));
Navbar.displayName = 'Navbar';

export function NavBarLink({
  children,
  href,
}: {
  readonly children: React.ReactNode;
  readonly href: string;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          'text-base font-bold text-gray-600'
        )}
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function NavbarItem({
  children,
  title,
  className,
}: {
  readonly children: React.ReactNode;
  readonly title: string;
  readonly className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const parentWidth =
      ref.current?.parentElement?.parentElement?.getBoundingClientRect()
        .width ?? 0;
    setWidth(Math.max(parentWidth, 500));
    const left = (width - parentWidth) / 2;
    if (ref.current) {
      const a = ref.current?.parentElement?.parentElement?.parentElement
        ?.parentElement?.childNodes?.[1] as HTMLElement;
      if (a) {
        console.log(left);
        a.style.left = `-${left}px`;
      }
    }
  }, [width]);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        ref={ref}
        className='text-base font-bold text-gray-600'
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        style={{
          width,
        }}
        className={cn('p-4 text-base font-bold text-gray-600', className)}
      >
        {children}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
