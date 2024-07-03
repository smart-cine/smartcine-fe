import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TFilm } from './film.type';

export const {
  create: useCreateFilm,
  list: useListFilm,
  read: useReadFilm,
  patch: usePatchFilm,
  delete: useDeleteFilm,
} = genQueryCrud<TFilm>('films');
