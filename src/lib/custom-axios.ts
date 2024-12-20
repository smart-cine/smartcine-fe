import { default as baseAxios, type RawAxiosRequestHeaders } from 'axios';

// import { env } from './env';
const { env } = process;

const headers: RawAxiosRequestHeaders = {
  'Content-Type': 'application/json',
};

if (process.env.NODE_ENV === 'development') {
  // headers.Authorization = `Bearer ${env.NEXT_PUBLIC_API_TEST_TOKEN}`;
  headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2NmZiZjMzLTk2NjctNDhiMC05MjQ3LTgzYmYxZTRkYTUxZCIsInJvbGUiOiJCVVNJTkVTUyIsImlhdCI6MTcyNzQ1NjcyNywiZXhwIjoxNzMwMDQ4NzI3fQ.BMCagMnixRwMmb9VSF1dRwEKkRx-0mOK0600SU7SXzU`;
}

export const customAxios = baseAxios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/${env.NEXT_PUBLIC_API_VERSION}`,
  headers,
  withCredentials: true,
});
