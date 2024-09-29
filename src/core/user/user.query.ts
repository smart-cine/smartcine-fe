import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TUser } from './user.type';

export const { read: useReadUser } = genQueryCrud<TUser>('account');
