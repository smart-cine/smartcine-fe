import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { DefaultBookForm } from '@/components/book-form/DefaultBookForm';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sparkles } from '@/components/other/Sparkles';
import { CinemaDetail } from '@/components/pages/cinema/[cinema_id]/CinemaDetail';
import { CurrentShows } from '@/components/pages/index/CurrentShows';
import { FAQSection } from '@/components/pages/index/FAQSection';
import { useReadCinema } from '@/core/cinema/cinema.query';

export default function CinemaById() {
  const router = useRouter();
  const cinema_id = router.query.cinema_id as string | undefined;

  const { data: cinema } = useReadCinema(cinema_id);

  if (!cinema) {
    return;
  }

  return (
    <>
      <NextSeo title={`SmartCine - ${cinema.name}`} />
      <MainLayout>
        <ConstrainedContainer
          background='/cinema/beta-bg.jpg'
          className='h-[320px]'
          contentClass='h-full'
        >
          <CinemaDetail cinema_id={cinema.id} />
        </ConstrainedContainer>
        <ConstrainedContainer
          className='mt-16'
          contentClass='gap-y-8 flex flex-col'
        >
          <p className='text-center text-3xl font-bold text-momo'>
            Lịch chiếu phim {cinema.name}
          </p>
          <DefaultBookForm />
        </ConstrainedContainer>
        {/* Current shows */}
        <ConstrainedContainer className="mt-16 bg-black bg-[url('/momo-showingmovies-bg.jpg')] bg-contain bg-center bg-no-repeat py-6">
          <p className='mx-auto mt-5 w-fit text-3xl font-bold text-white'>
            <Sparkles>Current shows</Sparkles>
          </p>
          <CurrentShows hasIndex className='bg-transparent' />
        </ConstrainedContainer>

        {/* Top rated film */}
        {/* <ConstrainedContainer className='py-6'>
        <p className='text-momo mx-auto w-fit text-2xl font-bold'>Blog</p>
        <div className='mx-auto w-fit py-44 text-3xl'>COMING SOON!</div>
      </ConstrainedContainer> */}

        {/* FAQ */}
        <ConstrainedContainer className='py-6'>
          <div className='flex flex-row flex-wrap gap-x-10 gap-y-5 lg:flex-nowrap'>
            <p className='mx-auto mt-5 w-fit text-3xl font-bold text-pink-600 lg:whitespace-nowrap'>
              Frequently asked questions
            </p>
            <FAQSection />
          </div>
          <p className='mt-10'>
            Not finding your question? Contact support{' '}
            <Link className='text-sky-600' href='#'>
              here
            </Link>
          </p>
        </ConstrainedContainer>
      </MainLayout>
    </>
  );
}
