/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/query-client';

import { customAxios } from './custom-axios';

export type CreateMethod<Item> = (body?: Record<string, any>) => Promise<Item>;
export type ListMethod<Item> = (
  options?: Record<string, any>
) => Promise<Item[]>;
export type ReadMethod<Item> = (
  id: string,
  options?: Record<string, any>
) => Promise<Item>;
export type PatchMethod<Item> = (
  id: string,
  patch: Partial<Item>
) => Promise<Item>;
export type DeleteMethod<Item> = (id: string) => Promise<Item>;

export function genQueryCrud<
  Item,
  C extends CreateMethod<Item> = CreateMethod<Item>,
  L extends ListMethod<Item> = ListMethod<Item>,
  R extends ReadMethod<Item> = ReadMethod<Item>,
  P extends PatchMethod<Item> = PatchMethod<Item>,
  D extends DeleteMethod<Item> = DeleteMethod<Item>,
>(
  queryKey: string,
  methods: Partial<{
    create: C;
    list: L;
    read: R;
    patch: P;
    delete: D;
  }> = {}
) {
  const defaultCreate: CreateMethod<Item> = async (body) =>
    (await customAxios.post(`/${queryKey}`, body)).data.data as Item;
  const defaultList: ListMethod<Item> = async (options) =>
    (
      await customAxios.get(
        `/${queryKey}${options ? `?${new URLSearchParams(options).toString()}` : ''}`
      )
    ).data.data as Item[];
  const defaultRead: ReadMethod<Item> = async (id, options) =>
    (
      await customAxios.get(
        `/${queryKey}/${id}${
          options ? `?${new URLSearchParams(options).toString()}` : ''
        }`
      )
    ).data.data as Item;
  const defaultPatch: PatchMethod<Item> = async (id, patch) =>
    (await customAxios.put(`/${queryKey}/${id}`, patch)).data.data as Item;
  const defaultDelete: DeleteMethod<Item> = async (id) =>
    (await customAxios.delete(`/${queryKey}/${id}`)).data.data as Item;

  const allMethods = {
    create: defaultCreate as C,
    list: defaultList as L,
    read: defaultRead as R,
    patch: defaultPatch as P,
    delete: defaultDelete as D,
    ...methods,
  } satisfies {
    create: C;
    list: L;
    read: R;
    patch: P;
    delete: D;
  };

  return {
    create() {
      return useMutation({
        mutationFn: allMethods.create,
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
    list(...args: Parameters<L>) {
      return useQuery({
        queryKey: [queryKey],
        queryFn: async () => allMethods.list(...args),
      });
    },
    read(id: string | undefined, ...args: ParametersExceptFirst<R>) {
      return useQuery({
        queryKey: [queryKey, id],
        queryFn: async () => allMethods.read(id, ...args),
        enabled: Boolean(id),
      });
    },
    patch() {
      return useMutation({
        // @ts-expect-error
        mutationFn: allMethods.patch,
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
    delete() {
      return useMutation({
        mutationFn: allMethods.delete,
        async onSuccess() {
          return queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        },
      });
    },
  };
}

type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
  ? R
  : never;
