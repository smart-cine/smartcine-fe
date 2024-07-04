import '@/styles/globals.css';
import '@fontsource/open-sans';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { getMessages } from '@/messages';
import { QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';

import { queryClient } from '@/lib/query-client';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={getMessages(router.locale)}
        timeZone='Asia/Ho_Chi_Minh'
      >
        <Component {...pageProps} />
        <SpeedInsights />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
