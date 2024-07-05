import { resolve } from 'url';

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
  headers.Authorization = `Bearer ${env.NEXT_PUBLIC_TEST_TOKEN}`;
}

export async function customFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // console.log('fetching', resolve(baseUrl, url));
  return fetch(resolve(baseUrl, url), {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
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
