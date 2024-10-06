import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TPayment } from './payment.type';

export const { create: useCreatePayment } = genQueryCrud<string>('payment');
