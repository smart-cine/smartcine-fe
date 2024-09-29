import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TItem } from './item.type';

export const {
  create: useCreateItem,
  list: useListItem,
  read: useReadItem,
  patch: usePatchItem,
  delete: useDeleteItem,
} = genQueryCrud<TItem>('item');
