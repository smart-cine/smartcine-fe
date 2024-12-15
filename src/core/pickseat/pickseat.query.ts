import { type SuccessRes } from '@/types/ServerResponse';
import { customAxios } from '@/lib/custom-axios';
import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TPickseat } from './pickseat.type';

export const {
  create: useCreatePickseat,
  list: useListPickseat,
  delete: useDeletePickseat,
} = genQueryCrud<TPickseat>('pickseat', {
  async delete(id: string, perform_id: string) {
    return (
      await customAxios.delete<SuccessRes<TPickseat>>('pickseat', {
        data: {
          perform_id,
          layout_seat_id: id,
        },
      })
    ).data.data;
  },
});
