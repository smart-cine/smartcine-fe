import { Inter } from 'next/font/google';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { Navbar } from '@/components/navbar/home-navbar';
import LocaleSwitcher from '@/components/other/LocaleSwitcher';
import { CheckList } from '@/components/pages/index/CheckList';
import { CurrentShows } from '@/components/pages/index/CurrentShows';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useQueryFilm } from '@/core/film/film.query';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: films } = useQueryFilm();
  console.log('films', films);

  return (
    <>
      {/* Home Navbar */}
      <Navbar className='sticky top-0 z-10'>
        <Navbar.Item title='Movie schedule'>
          <div className='mx-auto flex flex-col'>
            <Link
              href='#'
              className={cn(
                navigationMenuTriggerStyle(),
                'w-full justify-start'
              )}
            >
              Currently showing movies
            </Link>
            <Link
              href='#'
              className={cn(
                navigationMenuTriggerStyle(),
                'w-full justify-start'
              )}
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

      {/* Movie schedule */}
      <ConstrainedContainer className='bg-[#FDF2F8] py-6'>
        <CheckList>
          <CheckList.Item>
            Lịch chiếu luôn <b>cập nhật sớm nhất</b>
          </CheckList.Item>
          <CheckList.Item>Suất chiếu đầy đủ các rạp</CheckList.Item>
          <CheckList.Item>
            Đặt lịch chiếu <b>mua vé siêu nhanh</b>
          </CheckList.Item>
          <CheckList.Item>
            <p>Đặt vé lịch chiếu phim yêu thích mọi nơi</p>
          </CheckList.Item>
        </CheckList>
      </ConstrainedContainer>

      {/* Cinema near you */}
      <ConstrainedContainer className='py-6'>
        <p className='mx-auto w-fit text-2xl font-bold text-[#b12572]'>
          Find cinema near you
        </p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer>

      {/* Current shows */}
      <ConstrainedContainer className="bg-[url('/momo-showingmovies-bg.jpg')] py-6">
        <p className='mx-auto w-fit text-2xl font-bold text-white'>
          Current shows
        </p>
        <CurrentShows films={films ?? []} />
      </ConstrainedContainer>

      {/* Cinema system */}
      <ConstrainedContainer className='py-6'>
        <p className='mx-auto w-fit text-2xl font-bold text-[#b12572]'>
          Cinema system
        </p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer>

      {/* Blog */}
      <ConstrainedContainer className='py-6'>
        <p className='mx-auto w-fit text-2xl font-bold text-[#b12572]'>Blog</p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer>

      {/* News - Events */}
      <ConstrainedContainer className='py-6'>
        <p className='mx-auto w-fit text-2xl font-bold text-[#b12572]'>
          News - Events
        </p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer>

      {/* FAQ */}
      <ConstrainedContainer className='py-6'>
        <p className='mx-auto w-fit text-2xl font-bold text-[#b12572]'>FAQ</p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer>
    </>
  );
}
