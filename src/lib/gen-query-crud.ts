/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  type SuccessPaginationRes,
  type SuccessRes,
} from '@/types/ServerResponse';
import { queryClient } from '@/lib/query-client';

import { customAxios } from './custom-axios';
import { customFetchJson } from './custom-fetch';

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
export type DeleteMethod<Item> = (id: string, ...args: any[]) => Promise<Item>;

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
  }> = {},
  fetchType: 'axios' | 'fetch' = 'fetch'
) {
  const allMethods = {
    ...genDefaultCrudApi<Item>(queryKey, fetchType),
    ...methods,
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
        queryKey: [queryKey, ...args],
        queryFn: async () => allMethods.list(...args),
      });
    },
    read(id: string | undefined, ...args: ParametersExceptFirst<R>) {
      return useQuery({
        queryKey: [queryKey, id],
        queryFn: async () => allMethods.read(id ?? '', ...args),
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

function genDefaultCrudApi<Item>(
  url: string,
  type: 'axios' | 'fetch' = 'fetch'
): {
  create: CreateMethod<Item>;
  list: ListMethod<Item>;
  read: ReadMethod<Item>;
  patch: PatchMethod<Item>;
  delete: DeleteMethod<Item>;
} {
  if (type === 'axios') {
    return {
      async create(body: Record<string, any> = {}) {
        sweepUndefined(body);
        return (await customAxios.post<SuccessRes<Item>>(url, body)).data.data;
      },
      async list(options: Record<string, any> = {}) {
        sweepUndefined(options);
        return (
          await customAxios.get<SuccessPaginationRes<Item>>(
            `${url}${options ? `?${new URLSearchParams(options).toString()}` : ''}`
          )
        ).data.data;
      },
      async read(id: string, options: Record<string, any> = {}) {
        sweepUndefined(options);
        return (
          await customAxios.get<SuccessRes<Item>>(
            `${url}/${id}${options ? `?${new URLSearchParams(options).toString()}` : ''}`
          )
        ).data.data;
      },
      async patch(id: string, patch: Record<string, any> = {}) {
        sweepUndefined(patch);
        return (await customAxios.put<SuccessRes<Item>>(`${url}/${id}`, patch))
          .data.data;
      },
      async delete(id: string) {
        return (await customAxios.delete<SuccessRes<Item>>(`${url}/${id}`)).data
          .data;
      },
    };
  }

  // Default value: fetch
  return {
    async create(body: Record<string, any> = {}) {
      sweepUndefined(body);
      return (
        await customFetchJson<SuccessRes<Item>>(url, {
          method: 'POST',
          body: JSON.stringify(body),
        })
      ).data;
    },
    async list(options: Record<string, any> = {}) {
      sweepUndefined(options);

      return (
        await customFetchJson<SuccessPaginationRes<Item>>(
          `${url}${options ? `?${new URLSearchParams(options).toString()}` : ''}`
        )
      ).data;
    },
    async read(id: string, options: Record<string, any> = {}) {
      sweepUndefined(options);
      return (
        await customFetchJson<SuccessRes<Item>>(
          `${url}/${id}${options ? `?${new URLSearchParams(options).toString()}` : ''}`
        )
      ).data;
    },
    async patch(id: string, patch: Record<string, any> = {}) {
      sweepUndefined(patch);
      return (
        await customFetchJson<SuccessRes<Item>>(`${url}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(patch),
        })
      ).data;
    },
    async delete(id: string) {
      return (
        await customFetchJson<SuccessRes<Item>>(`${url}/${id}`, {
          method: 'DELETE',
        })
      ).data;
    },
  };
}

function sweepUndefined(obj: Record<string, any>) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key];
    }
  }
}

type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
  ? R
  : never;
