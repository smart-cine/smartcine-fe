/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/query-client';

import { customAxios } from './custom-axios';

export type CreateCRUD<Item> = (...args: any[]) => Promise<Item>;
export type ReadCRUD<Item> = (...args: any[]) => Promise<Item[]>;
export type UpdateCRUD<Item> = (id: string, ...args: any[]) => Promise<Item>;
export type DeleteCRUD<Item> = (id: string) => Promise<Item>;

export function genQueryCrud<Item>(
  queryKey: string,
  crud: Partial<{
    create: CreateCRUD<Item>;
    read: ReadCRUD<Item>;
    update: UpdateCRUD<Item>;
    delete: DeleteCRUD<Item>;
  }> = {}
) {
  crud.create ||= async () =>
    (await customAxios.post(`/${queryKey}`)).data.data as Item;

  crud.read ||= async () =>
    (await customAxios.get(`/${queryKey}`)).data.data as Item[];

  crud.update ||= async (id: string) =>
    (await customAxios.put(`/${queryKey}/${id}`)).data.data as Item;

  crud.delete ||= async (id: string) =>
    (await customAxios.delete(`/${queryKey}/${id}`)).data.data as Item;

  return {
    create(...args: Parameters<typeof crud.create>) {
      return useMutation({
        mutationFn: async () => crud.create!(args),
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
    read(...args: Parameters<typeof crud.read>) {
      return useQuery({
        queryKey: [queryKey],
        queryFn: async () => crud.read!(args),
      });
    },
    update(id: string, ...args: Parameters<typeof crud.update>) {
      return useMutation({
        mutationFn: async () => crud.update!(id, args),
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
    delete(id: string) {
      return useMutation({
        mutationFn: async () => crud.delete!(id),
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
  };
}
