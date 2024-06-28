import { NOT_FOUND_PICTURE } from '@/constant/NotFoundPicture';
import ShowMoreText from 'react-show-more-text';

import { cn } from '@/lib/utils';
import { AgeTag } from '@/components/AgeTag';
import { MinimalFilmCard } from '@/components/card/MinimalFilmCard';
import { StarIcon } from '@/components/icon/StarIcon';
import { PlayButton } from '@/components/PlayButton';
import { StarRating } from '@/components/Rating';
import { Separator } from '@/components/ui/separator';
import { type TFilm } from '@/core/film/film.type';

export function FilmDetail({
  className,
  film,
}: {
  readonly className?: string;
  readonly film: TFilm;
}) {
  return (
    <div className='flex flex-row gap-x-10 py-16 text-white'>
      <MinimalFilmCard
        pictureUrl={film.picture_url ?? NOT_FOUND_PICTURE.FILM}
        className='max-h-[400px] basis-1/4'
      />
      <div className='z-50 flex basis-3/4 flex-col gap-y-3.5'>
        <AgeTag restrictAge={film.restrict_age} />
        <div className='flex flex-col'>
          <p className='text-2xl font-bold text-gray-50 md:text-4xl'>
            {film.title}
          </p>
          <div className='flex flex-row gap-x-4'>
            <p>Despicable Me 4</p>
            <p>{new Date(film.release_date).getFullYear()}</p>
            <p>{film.duration} phút</p>{' '}
          </div>
        </div>
        <StarRating amount={40} rating={10} className='text-2xl font-bold' />
        <p className='italic text-gray-400'>
          Mọi thứ trở nên đáng khinh hơn một chút.
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
            <p className='text-gray-400'>Ngày chiếu</p>
            <p className='font-semibold text-gray-50'>05/07/2024</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-gray-400'>Thể loại</p>
            <p className='font-semibold text-gray-50'>{film.tags.join(', ')}</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-gray-400'>Quốc gia</p>
            <p className='font-semibold text-gray-50'>Mỹ</p>
          </div>
        </div>
        <div className='flex flex-row gap-x-3 text-sm'>
          <div className='flex cursor-pointer flex-row items-center gap-x-2'>
            <div className='rounded-full border-2 border-momo p-0.5'>
              <PlayButton className='h-4 w-4' />
            </div>
            Xem review
          </div>
          <div className='flex cursor-pointer flex-row items-center gap-x-2'>
            <div className='rounded-full border-2 border-yellow-300 p-0.5'>
              <StarIcon className='h-4 w-4' />
            </div>
            Xem review
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}
