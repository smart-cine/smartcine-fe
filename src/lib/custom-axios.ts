import { default as baseAxios, type RawAxiosRequestHeaders } from 'axios';

import { env } from './env';

const headers: RawAxiosRequestHeaders = {
  'Content-Type': 'application/json',
};

if (process.env.NODE_ENV === 'development') {
  headers.Authorization = `Bearer ${env.NEXT_PUBLIC_TEST_TOKEN}`;
}

export const customAxios = baseAxios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/${env.NEXT_PUBLIC_API_VERSION}`,
  headers,
  withCredentials: true,
});
