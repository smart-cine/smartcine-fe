import { useRouter } from 'next/router';
import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';

import { films } from '@/lib/fake/films';
import { cn } from '@/lib/utils';
import { MinimalBookForm } from '@/components/book-form/MinimalBookForm';
import { FilmCard } from '@/components/card/FilmCard';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { MainLayout } from '@/components/layout/MainLayout';
import { FilmDetail } from '@/components/pages/film/[filmId]/FilmDetail';
import { Separator } from '@/components/ui/separator';

export default function FilmById() {
  const router = useRouter();
  const film = films.find((film) => film.id === router.query.filmId);
  console.log('film', film);

  if (!film) {
    return;
  }

  return (
    <MainLayout>
      <ConstrainedContainer
        background={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
      >
        <FilmDetail film={film} />
      </ConstrainedContainer>
      <ConstrainedContainer>
        <div className='flex flex-row gap-x-10'>
          <MinimalBookForm className='my-16 basis-2/3' film={film} />
          <div className='my-16 flex basis-1/3 flex-col gap-y-2'>
            <p className='mb-4 text-xl font-bold'>Phim đang chiếu</p>
            {films.map((film, index) => (
              <div key={film.id}>
                <FilmCard variant='white' film={film} />
                {index !== films.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </ConstrainedContainer>
    </MainLayout>
  );
}
