import Link from 'next/link';

import { cinemaProviders } from '@/lib/fake/cinema-providers';
import { cn, genericMemo } from '@/lib/utils';
import {
  Navbar,
  NavbarItem,
  NavBarLink,
} from '@/components/navbar/home-navbar';

import { useIndicator } from '../animation/indicator/hooks/useIndicator';
import { Indicator } from '../animation/indicator/Indicator';
import { ScrollToTop } from '../button/ScrollToTop';
import { ConstrainedContainer } from '../container/constrained-container';
import {
  CustomBreadcrumb,
  type TBreadcrumbRoute,
} from '../other/CustomBreadcrumb';
import { Footer } from '../pages/index/Footer';

const navbarItemStyle =
  'flex min-h-10 w-full items-center justify-start rounded-sm px-4 text-gray-600 transition-all hover:bg-pink-100 hover:bg-opacity-50 hover:text-pink-700';

export const MainLayout = genericMemo<
  React.FC<{
    readonly className?: string;
    readonly children: React.ReactNode;
    routes?: TBreadcrumbRoute[];
  }>
>(({ className, children, routes = [] }) => {
  const { parentRef, indicatorRef } = useIndicator<HTMLUListElement>(true);
  return (
    <div className={cn(className, 'relative')}>
      <Navbar ref={parentRef} className='sticky top-0 z-50 bg-white'>
        <Indicator ref={indicatorRef} />
        <NavbarItem
          title='Movie schedule'
          className='flex flex-col gap-y-2 p-4'
        >
          <Link href='#' className={cn(navbarItemStyle, 'indicator')}>
            Currently showing movies
          </Link>
          <Link href='#' className={cn(navbarItemStyle, 'indicator')}>
            Upcoming movies
          </Link>
        </NavbarItem>
        <NavbarItem title='Cinema' className='flex flex-col gap-y-2 p-4'>
          {cinemaProviders.map((cinema) => (
            <Link
              key={cinema}
              href={`/cinema/${cinema}`}
              className={cn(navbarItemStyle, 'indicator')}
            >
              {cinema}
            </Link>
          ))}
        </NavbarItem>
        {/* <Navbar.Link href="#"></Navbar.Link> */}
        <NavBarLink href='#'>Top film</NavBarLink>
        <NavbarItem title='Blog'>
          asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd
          asdasd
        </NavbarItem>
        {/* <Navbar.Item title='Change language'>
        <LocaleSwitcher />
      </Navbar.Item> */}
      </Navbar>

      {/* Breadcumb */}
      <ConstrainedContainer className='ml-2'>
        <CustomBreadcrumb routes={routes} />
      </ConstrainedContainer>

      {children}

      <Footer />

      <ScrollToTop />
    </div>
  );
});
MainLayout.displayName = 'MainLayout';
