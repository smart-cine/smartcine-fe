import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TComment } from './comment.type';

export const {
  create: useCreateComment,
  list: useListComment,
  read: useReadComment,
  patch: usePatchComment,
  delete: useDeleteComment,
} = genQueryCrud<TComment>('comment');
