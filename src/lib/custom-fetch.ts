import { resolve } from 'url';

import { type TErrorResponse } from '@/core/error/error.type';

import { env } from './env';

const baseUrl = addTrailingSlash(
  resolve(
    addTrailingSlash(env.NEXT_PUBLIC_API_URL),
    env.NEXT_PUBLIC_API_VERSION
  )
);

const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

if (process.env.NODE_ENV === 'development') {
  // headers.Authorization = `Bearer ${env.NEXT_PUBLIC_API_TEST_TOKEN}`;
  headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMDRjOGQ0LTMyZTgtNDgzYi1hZDlmLTkzZDNmM2VhNjFlNyIsInJvbGUiOiJCVVNJTkVTUyIsImlhdCI6MTczNDYxMDMwOSwiZXhwIjoxNzM3MjAyMzA5fQ.N4Ie17t9NNsg1cCPUzqzSsl1AGpnzpnWPxh34VKp6WU`;
}

export async function customFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // console.log('fetching', resolve(baseUrl, url));
  const response = await fetch(resolve(baseUrl, url), {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  if (!response.ok) {
    if (response.status === 500) {
      const res = (await response.json()) as TErrorResponse;
      throw new Error(res.message);
    }

    throw new Error(
      `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`
    );
  }

  return response;
}

export async function customFetchJson<SuccessResponse = any>(
  url: string,
  options: RequestInit = {}
): Promise<SuccessResponse> {
  return customFetch(resolve(baseUrl, url), options).then(async (res) =>
    res.json()
  ) as Promise<SuccessResponse>;
}

function addTrailingSlash(url: string) {
  if (url.endsWith('/')) {
    return url;
  }

  return url + '/';
}
