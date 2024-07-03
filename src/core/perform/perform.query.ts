import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TPerform } from './perform.type';

export const {
  create: useCreatePerform,
  list: useListPerform,
  read: useReadPerform,
  patch: usePatchPerform,
  delete: useDeletePerform,
} = genQueryCrud<TPerform>('performs');
