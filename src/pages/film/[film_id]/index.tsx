import { useRouter } from 'next/router';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';
import { NextSeo } from 'next-seo';

import { useScrollableSidebar } from '@/hooks/useScrollableSidebar';
import { MinimalBookForm } from '@/components/book-form/MinimalBookForm';
import { FilmCard } from '@/components/card/FilmCard';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { MainLayout } from '@/components/layout/MainLayout';
import { FilmDetail } from '@/components/pages/film/[film_id]/FilmDetail';
import { Separator } from '@/components/ui/separator';
import { useListFilm, useReadFilm } from '@/core/film/film.query';

export default function FilmById() {
  const router = useRouter();
  const film_id = router.query.film_id as string | undefined;

  const { data: film } = useReadFilm(film_id);
  const { data: films = [] } = useListFilm();
  const { ref: refSidebar, refParent: refParentSidebar } = useScrollableSidebar(
    { marginTop: 80 }
  );

  if (!film || !films.length) {
    return;
  }

  return (
    <>
      <NextSeo title={`SmartCine - ${film.title}`} />
      <MainLayout
        routes={[
          {
            label: 'Film',
            route: '/film',
          },
          {
            label: film.title,
            route: `/film/${film.id}`,
          },
        ]}
      >
        <ConstrainedContainer
          background={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
        >
          <FilmDetail film_id={film.id} />
        </ConstrainedContainer>
        <ConstrainedContainer>
          <div className='flex flex-row flex-wrap justify-center gap-x-10 lg:flex-nowrap'>
            <MinimalBookForm
              className='my-16 max-w-[80%] lg:max-w-[66%]'
              film_id={film.id}
            />

            {/* Current shows */}
            <div
              ref={refParentSidebar}
              className='my-16 w-full max-w-[80%] gap-y-2 lg:max-w-[30%]'
            >
              <div ref={refSidebar} className='relative flex flex-col'>
                <p className='mb-4 text-xl font-bold'>Phim đang chiếu</p>
                {films.map((film, index) => (
                  <div key={film.id}>
                    {/* <FilmCard
                    hasPlayButton={false}
                    className='flex-row gap-x-2'
                    variant='white'
                    film_id={film.id}
                    imageClass='max-w-[250px] h-[350px] lg:max-w-[70px] lg:max-h-[110px]'
                    index={index + 1}
                    indexClass='text-xl text-gray-100 bottom-3 left-1'
                  />
                  {index !== films.length && <Separator className='mb-2.5' />} */}
                    <FilmCard
                      hasPlayButton={false}
                      className='flex-row gap-x-2'
                      variant='white'
                      film_id={film.id}
                      imageClass='max-w-[70px] aspect-[6.5/10]'
                      index={index + 1}
                      indexClass='text-xl text-gray-100 bottom-3 left-1'
                    />
                    {index !== films.length - 1 && (
                      <Separator className='mb-2.5' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ConstrainedContainer>
      </MainLayout>
    </>
  );
}
