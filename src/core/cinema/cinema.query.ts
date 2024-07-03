import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TCinema } from './cinema.type';

export const {
  create: useCreateCinema,
  list: useListCinema,
  read: useReadCinema,
  patch: usePatchCinema,
  delete: useDeleteCinema,
} = genQueryCrud<TCinema>('cinemas');
