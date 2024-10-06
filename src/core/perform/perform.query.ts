import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TPerform } from './perform.type';

export const {
  create: useCreatePerform,
  read: useReadPerform,
  patch: usePatchPerform,
  delete: useDeletePerformBy,
} = genQueryCrud<TPerform>('perform');

export const useListPerformByCinema = genQueryCrud<{
  cinema_id: string;
  performs: TPerform[];
}>('perform/list-cinema').list;

export const useListPerformByFilm = genQueryCrud<{
  film_id: string;
  performs: TPerform[];
}>('perform/list-film').list;
