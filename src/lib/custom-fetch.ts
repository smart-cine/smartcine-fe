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
  // headers.Authorization = `Bearer ${env.NEXT_PUBLIC_API_TEST_TOKEN}`;
  headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjMmRkYWFlLTg3MmUtNGE4Mi05YmQxLWFiNzBhYjg5OTMzYSIsInJvbGUiOiJCVVNJTkVTUyIsImlhdCI6MTcyNzYzMzY5OSwiZXhwIjoxNzMwMjI1Njk5fQ.OoG46XXfSw3_zdxT1wkf0Mx37bpWZ0f9jCJIhXk7dE4`;
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
