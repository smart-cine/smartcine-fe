import { ETranslate, EView, type TPerform } from '@/core/perform/perform.type';

const fakeTime = Array.from({ length: 10 }, (_, i) => ({
  start_time: new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24),
  end_time: new Date(
    new Date().getTime() +
      i * 1000 * 60 * 60 +
      1000 * 60 * 60 * 24 +
      1000 * 60 * 60
  ),
}));

export const performs: TPerform[] = [
  {
    id: '1',
    film_id: '1',
    dest_id: '1',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[0].start_time,
    end_time: fakeTime[0].end_time,
  },
  {
    id: '2',
    film_id: '2',
    dest_id: '2',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[1].start_time,
    end_time: fakeTime[1].end_time,
  },
  {
    id: '3',
    film_id: '3',
    dest_id: '3',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[2].start_time,
    end_time: fakeTime[2].start_time,
  },
  {
    id: '4',
    film_id: '4',
    dest_id: '4',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[3].start_time,
    end_time: fakeTime[3].start_time,
  },
  {
    id: '5',
    film_id: '5',
    dest_id: '5',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[4].start_time,
    end_time: fakeTime[4].start_time,
  },
  {
    id: '6',
    film_id: '6',
    dest_id: '6',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[5].start_time,
    end_time: fakeTime[5].start_time,
  },
  {
    id: '7',
    film_id: '7',
    dest_id: '7',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[6].start_time,
    end_time: fakeTime[6].start_time,
  },
  {
    id: '8',
    film_id: '8',
    dest_id: '8',
    price: 100,
    translate_type: ETranslate.VOICEOVER,
    view_type: EView.V2D,
    start_time: fakeTime[7].start_time,
    end_time: fakeTime[7].start_time,
  },
];
