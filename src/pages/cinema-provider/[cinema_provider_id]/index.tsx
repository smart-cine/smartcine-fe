import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { DefaultBookForm } from '@/components/book-form/DefaultBookForm';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sparkles } from '@/components/other/Sparkles';
import { CinemaProviderDetail } from '@/components/pages/cinema-provider/[cinema_provider_id]/CinemaProviderDetail';
import { CurrentShows } from '@/components/pages/index/CurrentShows';
import { FAQSection } from '@/components/pages/index/FAQSection';
import { useReadCinemaProvider } from '@/core/cinema-provider/cinema-provider';

export default function CinemaProviderById() {
  const router = useRouter();
  const cinema_provider_id = router.query.cinema_provider_id as
    | string
    | undefined;

  const { data: cinema_provider } = useReadCinemaProvider(cinema_provider_id);

  if (!cinema_provider) {
    return;
  }

  return (
    <>
      <NextSeo title={`SmartCine - ${cinema_provider.name}`} />
      <MainLayout
        routes={[
          { label: 'Cinema', route: '/cinema' },
          {
            label: cinema_provider.name,
            route: `/cinema-provider/${cinema_provider.id}`,
          },
        ]}
      >
        <ConstrainedContainer
          background={cinema_provider.background_url}
          className='h-[320px]'
          contentClass='h-full'
        >
          <CinemaProviderDetail cinema_provider_id={cinema_provider.id} />
        </ConstrainedContainer>
        <ConstrainedContainer
          className='mt-16'
          contentClass='gap-y-8 flex flex-col'
        >
          <p className='text-center text-3xl font-bold text-momo'>
            Lịch chiếu phim rạp {cinema_provider.name}
          </p>
          <DefaultBookForm cinema_provider_id={cinema_provider_id} />
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
