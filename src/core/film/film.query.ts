import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TFilm } from './film.type';

export const {
  create: useCreateFilm,
  read: useQueryFilm,
  update: useUpdateFilm,
  delete: useDeleteFilm,
} = genQueryCrud<TFilm>('films');
