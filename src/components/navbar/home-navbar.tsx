import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '@radix-ui/react-navigation-menu';
import { DotIcon, MenuIcon } from 'lucide-react';

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

export function Navbar({
  className,
  children,
}: {
  readonly className?: string;
  readonly children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex h-[56px] flex-row items-center border-b-[2px] bg-white px-16 py-2 shadow-sm sm:px-6 lg:px-[20%]',
        className
      )}
    >
      <div className='hidden w-full flex-row lg:flex'>
        <Link href='/' className='flex items-center'>
          <div className='flex flex-row items-center gap-x-2.5'>
            <Image
              src='/smartcine-logo.svg'
              alt='smartcine logo'
              width={35}
              height={35}
            />
            <p className='font-bold leading-6 text-[#825AD8]'>SmartCine</p>
          </div>
        </Link>
        <div className='grow' />
        <div className='flex flex-row'>
          <NavigationMenu>
            <NavigationMenuList>{children}</NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className='flex w-full flex-row justify-end lg:hidden'>
        <MenuIcon className='h-6 w-6' />
      </div>
    </div>
  );
}

Navbar.Link = NavBarLink;
export function NavBarLink({
  children,
  href,
}: {
  readonly children: React.ReactNode;
  readonly href: string;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

Navbar.Item = NavbarItem;
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
      <NavigationMenuTrigger ref={ref}>{title}</NavigationMenuTrigger>
      <NavigationMenuContent
        style={{
          width,
        }}
        className={cn('p-4', className)}
      >
        {children}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
