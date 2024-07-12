import { useRouter } from 'next/router';
import { DotIcon } from 'lucide-react';

import { useScrollableSidebar } from '@/hooks/useScrollableSidebar';
import { MinimalBookForm } from '@/components/book-form/MinimalBookForm';
import { FilmCardReview } from '@/components/card/FilmCardReview';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { StarIcon } from '@/components/icon/StarIcon';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { UserComment } from '@/components/UserComment';
import { useReadFilm } from '@/core/film/film.query';

export default function FilmByIdReview() {
  const router = useRouter();
  const film_id = router.query.film_id as string | undefined;

  const { data: film } = useReadFilm(film_id);
  const { ref, refParent } = useScrollableSidebar({ marginTop: 80 });

  if (!film) {
    return;
  }

  return (
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
        {
          label: 'Review',
          route: `/film/${film.id}/review`,
        },
      ]}
    >
      <ConstrainedContainer>
        <div className='flex flex-row gap-x-5 pt-6'>
          <div
            ref={ref}
            className='sticky top-20 flex h-fit min-w-[25%] max-w-[25%] basis-1/4 flex-col gap-y-2'
          >
            <MinimalFilmCard
              className='mx-auto max-w-[200px]'
              film_id={film.id}
            />
            <p className='text-center font-bold text-black'>{film.title}</p>
            <div className='mx-auto w-fit text-sm text-gray-800'>
              <p>Thể loại: {film.tags.join(', ')}</p>
              <p>
                Ngày ra mắt:{' '}
                {new Date(film.release_date).toLocaleString().split(',')[0]}
              </p>
              <p>Quốc gia: {film.country}</p>
            </div>
            <Button className='mx-auto h-8' variant='momo'>
              Đặt vé ngay
            </Button>
          </div>
          <div className='flex max-w-[60%] flex-col justify-center gap-y-5'>
            <FilmCardReview
              film_id={film.id}
              className='h-[220px] rounded-xl'
            />
            <p className='text-2xl font-bold'>
              Review phim {film.title} trên SmartCine
            </p>
            <div className='mt-2 flex flex-col gap-y-2'>
              <p className='text-xl font-bold'>Bình luận từ người xem</p>
              <div className='flex flex-row items-center gap-x-1'>
                <StarIcon className='h-10 w-10' />
                <div className='flex flex-row text-gray-600'>
                  <p className='text-4xl font-semibold'>9.3</p>
                  <div className='relative top-2 flex min-h-full flex-row items-center gap-x-1 text-sm'>
                    <p className=''>/10</p>
                    <DotIcon className='h-2 w-2' />
                    <p>1.9K đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-y-5'>
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <UserComment key={index} body='phim nhu cc' />
              ))}
            </div>
            <MinimalBookForm className='' film_id={film.id} />
          </div>
        </div>
      </ConstrainedContainer>
    </MainLayout>
  );
}
