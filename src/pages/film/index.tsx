import { NextSeo } from 'next-seo';

import { ConstrainedContainer } from '@/components/container/constrained-container';
import { DefaultFilmSearchForm } from '@/components/form/film-search-form/DefaultFilmSearchForm';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sparkles } from '@/components/other/Sparkles';
import { CheckList } from '@/components/pages/index/CheckList';
import { CurrentShows } from '@/components/pages/index/CurrentShows';
import { Button } from '@/components/ui/button';

export default function FilmHome() {
  return (
    <>
      <NextSeo title='SmartCine - List film' />
      <MainLayout routes={[{ label: 'Film', route: '/film' }]}>
        <ConstrainedContainer className='bg-[#FDF2F8] py-6'>
          <CheckList>
            <CheckList.Item>
              Buy tickets online, <b>enjoy great movies</b>
            </CheckList.Item>
            <CheckList.Item>
              <b>Book tickets securely</b> on SmartCine
            </CheckList.Item>
            <CheckList.Item>
              <b>Choose your seats freely, buy popcorn and drinks </b>
              conveniently.
            </CheckList.Item>
            <CheckList.Item>
              Your <b>booking history</b> is saved immediately
            </CheckList.Item>
          </CheckList>
        </ConstrainedContainer>

        {/* Current shows */}
        <ConstrainedContainer className="bg-black bg-[url('/momo-showingmovies-bg.jpg')] bg-contain bg-center bg-no-repeat py-6">
          <p className='mx-auto mt-5 w-fit text-3xl font-bold text-white'>
            <Sparkles>Current shows</Sparkles>
          </p>
          <CurrentShows hasIndex className='bg-transparent' />
        </ConstrainedContainer>

        {/* Featured shows */}
        <ConstrainedContainer className='py-14'>
          <p className='mx-auto w-fit text-3xl font-bold text-pink-600'>
            Featured movies
          </p>

          <CurrentShows
            className='bg-transparent'
            variant='white'
            hasIndex={false}
          />
          <div className='w-full'>
            <div className='mx-auto w-fit'>
              <Button variant='momo' className='text-md font-md'>
                Find cinema film
              </Button>
            </div>
          </div>
        </ConstrainedContainer>

        {/* Find films */}
        <ConstrainedContainer className='py-14'>
          <DefaultFilmSearchForm />
        </ConstrainedContainer>
      </MainLayout>
    </>
  );
}
