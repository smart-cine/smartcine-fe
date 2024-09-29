import { genQueryCrud } from '@/lib/gen-query-crud';

import { type TCinemaRoom } from './cinema-room.type';

export const {
  create: useCreateCinemaRoom,
  list: useListCinemaRoom,
  read: useReadCinemaRoom,
  patch: usePatchCinemaRoom,
  delete: useDeleteCinemaRoom,
} = genQueryCrud<TCinemaRoom>('cinema-room');
