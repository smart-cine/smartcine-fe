import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

import { cn, genericMemo } from '@/lib/utils';
import { Navbar } from '@/components/navbar/home-navbar';
import LocaleSwitcher from '@/components/other/LocaleSwitcher';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import { ConstrainedContainer } from '../container/constrained-container';

export const MainLayout = genericMemo<
  React.FC<{ readonly className?: string; readonly children: React.ReactNode }>
>(({ className, children }) => (
  <div className={className}>
    <Navbar className='sticky top-0 z-10'>
      <Navbar.Item title='Movie schedule'>
        <div className='mx-auto flex flex-col'>
          <Link
            href='#'
            className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}
          >
            Currently showing movies
          </Link>
          <Link
            href='#'
            className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}
          >
            Upcoming movies
          </Link>
        </div>
      </Navbar.Item>
      <Navbar.Item title='Cinema'>
        <div className='mx-auto flex flex-col'>
          {['CGV', 'BHD', 'Galaxy', 'Lotte', 'MegaGS'].map((cinema) => (
            <Link
              key={cinema}
              href='#'
              className={cn(
                navigationMenuTriggerStyle(),
                'w-full justify-start'
              )}
            >
              {cinema}
            </Link>
          ))}
        </div>
      </Navbar.Item>
      {/* <Navbar.Link href="#"></Navbar.Link> */}
      <Navbar.Link href='#'>Top film</Navbar.Link>
      <Navbar.Item title='Blog'>
        asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd
        asdasd
      </Navbar.Item>
      <Navbar.Item title='Change language'>
        <LocaleSwitcher />
      </Navbar.Item>
    </Navbar>

    {/* Breadcumb */}
    <ConstrainedContainer className='ml-2 p-2'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>
              <HomeIcon className='h-4 w-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/components'>Cinema</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Movie schedule</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ConstrainedContainer>

    {children}
  </div>
));
MainLayout.displayName = 'MainLayout';
