import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TCinemaProvider } from './cinema-provider.type';

export const {
  create: useCreateCinemaProvider,
  list: useListCinemaProvider,
  read: useReadCinemaProvider,
  patch: usePatchCinemaProvider,
  delete: useDeleteCinemaProvider,
} = genQueryCrud<TCinemaProvider>('cinema-provider');
