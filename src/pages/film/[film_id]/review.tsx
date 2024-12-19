import { useRouter } from 'next/router';
import { DotIcon } from 'lucide-react';
import moment from 'moment';
import { NextSeo } from 'next-seo';

import { roundScore } from '@/lib/utils';
import { useScrollableSidebar } from '@/hooks/useScrollableSidebar';
import { MinimalBookForm } from '@/components/book-form/MinimalBookForm';
import { FilmCardReview } from '@/components/card/FilmCardReview';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { Comment } from '@/components/comment/Comment';
import { MinimalComment } from '@/components/comment/MinimalComment';
import { ConstrainedContainer } from '@/components/container/constrained-container';
import { StarIcon } from '@/components/icon/StarIcon';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useListComment } from '@/core/comment/comment.query';
import { CommentType } from '@/core/comment/comment.type';
import { useReadFilm } from '@/core/film/film.query';

export default function FilmByIdReview() {
  const router = useRouter();
  const film_id = router.query.film_id as string | undefined;

  const { data: film } = useReadFilm(film_id);
  const { data: comments = [] } = useListComment({
    dest_id: film_id,
    type: CommentType.FILM,
  });
  const { ref, refParent } = useScrollableSidebar({ marginTop: 80 });

  if (!film) {
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
          {
            label: 'Review',
            route: `/film/${film.id}/review`,
          },
        ]}
      >
        <ConstrainedContainer>
          <div className='flex flex-col gap-x-5 gap-y-5 pt-6 md:flex-row'>
            <div
              ref={ref}
              className='top-20 mb-28 flex h-fit basis-1/4 gap-x-5 md:sticky md:flex-col'
            >
              <MinimalFilmCard className='mx-auto max-w-[150px]' film={film} />
              <div className='flex grow flex-col gap-y-2'>
                <p className='text-left font-bold text-black md:text-center'>
                  {film.title}
                </p>
                <div className='w-[60%] text-sm text-gray-800 md:mx-auto'>
                  <p className='line-clamp-1'>
                    Thể loại: {film.tags.join(', ') || 'None'}
                  </p>
                  <p>
                    Ngày ra mắt:{' '}
                    {moment(film.release_date).format('DD/MM/YYYY')}
                  </p>
                  <p>Quốc gia: {film.country}</p>
                </div>
                <Button
                  className='h-8 w-fit md:mx-auto'
                  variant='momo-outline'
                  onClick={() => {
                    document.querySelector('#MinimalBookForm')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  Đặt vé ngay
                </Button>
              </div>
            </div>
            <div className='flex flex-col justify-center gap-y-5 md:max-w-[60%]'>
              <FilmCardReview film={film} className='h-[220px] rounded-xl' />
              <p className='text-2xl font-bold'>
                Review phim {film.title} trên SmartCine
              </p>
              <div className='mt-2 flex flex-col gap-y-2'>
                <p className='text-xl font-bold'>Bình luận từ người xem</p>
                <div className='flex flex-row items-center gap-x-1'>
                  <StarIcon className='h-10 w-10' />
                  <div className='flex flex-row text-gray-600'>
                    <p className='text-4xl font-semibold'>
                      {roundScore(film.rating.score * 10)}
                    </p>
                    <div className='relative top-2 flex min-h-full flex-row items-center gap-x-1 text-sm'>
                      <p className=''>/10</p>
                      <DotIcon className='h-2 w-2' />
                      <p>{film.rating.count} đánh giá</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-5'>
                {comments.map((comment) => (
                  // eslint-disable-next-line react/jsx-key
                  <>
                    <Comment key={comment.id} comment={comment} />
                    <hr />
                  </>
                ))}
              </div>
              <MinimalBookForm film={film} />
              <div className='py-12' />
            </div>
          </div>
        </ConstrainedContainer>
      </MainLayout>
    </>
  );
}
