import { useRef } from 'react';
import Link from 'next/link';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';

import { cn } from '@/lib/utils';
import { AgeTag } from '@/components/AgeTag';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { TrailerTrigger } from '@/components/dialog/TrailerTrigger';
import { PlayIcon } from '@/components/icon/PlayIcon';
import { StarIcon } from '@/components/icon/StarIcon';
import { StarRating } from '@/components/StarRating';

export function FilmDetail({
  className,
  film,
}: {
  readonly className?: string;
  readonly film: {
    id: string;
    title: string;
    release_date: string;
    duration: number;
    rating: { score: number; count: number };
    description: string;
    tags: string[];
    country: string;
    restrict_age: number;
  };
}) {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap gap-x-10 gap-y-4 py-16 text-white md:flex-nowrap',
        className
      )}
    >
      <MinimalFilmCard
        hasPlayButton
        film={film}
        className='w-full md:w-auto'
        imageClass='max-h-[170px] w-auto md:max-w-[240px] md:max-h-full md:w-full'
      />
      <div className='flex basis-3/4 flex-col gap-y-3.5'>
        <AgeTag restrictAge={film.restrict_age} />
        <div className='flex flex-col'>
          <p className='text-2xl font-bold text-gray-50 md:text-4xl'>
            {film.title}
          </p>
          <div className='flex flex-row gap-x-4 text-gray-400'>
            <p>{film.title}</p>
            <p>{new Date(film.release_date).getFullYear()}</p>
            <p>{film.duration} phút</p>{' '}
          </div>
        </div>
        <StarRating
          count={film.rating.count}
          rating={film.rating.score}
          className='text-2xl font-bold'
        />
        <p className='italic text-gray-400'>
          Things just got a little more despicable.
        </p>
        <div className='flex flex-col'>
          <p className='font-bold'>Nội dung</p>
          <ShowMoreText
            className='text-sm text-gray-400'
            lines={1}
            anchorClass='cursor-pointer text-yellow-400'
            more='Show more'
            less='Show less'
          >
            {film.description}
          </ShowMoreText>
        </div>
        <div className='flex flex-row gap-x-4 text-sm'>
          <div className='flex flex-col'>
            <p className='text-gray-400'>Ngày ra mắt</p>
            <p className='font-semibold text-gray-50'>
              {moment(film.release_date).format('DD/MM/YYYY')}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-gray-400'>Thể loại</p>
            <p className='font-semibold text-gray-50'>{film.tags.join(', ')}</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-gray-400'>Quốc gia</p>
            <p className='font-semibold text-gray-50'>{film.country}</p>
          </div>
        </div>
        <div className='flex flex-row gap-x-3 text-sm'>
          <TrailerTrigger film={film}>
            <div className='flex cursor-pointer flex-row items-center gap-x-2'>
              <div className='rounded-full border-2 border-momo p-0.5'>
                <PlayIcon className='h-4 w-4' />
              </div>
              Xem review
            </div>
          </TrailerTrigger>
          <Link href={`/film/${film.id}/review`} target='_blank'>
            <div className='flex cursor-pointer flex-row items-center gap-x-2'>
              <div className='rounded-full border-2 border-yellow-300 p-0.5'>
                <StarIcon className='h-4 w-4' />
              </div>
              Xem đánh giá
            </div>
          </Link>
        </div>
        <div />
      </div>
    </div>
  );
}
