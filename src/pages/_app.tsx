import '@/styles/globals.css';
import '@fontsource/open-sans';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { getMessages } from '@/messages';
import { QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';

import { queryClient } from '@/lib/query-client';
import { ThemeProvider } from '@/components/theme-provider';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={getMessages(router.locale)}
        timeZone='Asia/Ho_Chi_Minh'
      >
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute='class'
          // defaultTheme='system'
          // TODO: change to system
          defaultTheme='white'
        >
          <Component {...pageProps} />
        </ThemeProvider>
        <SpeedInsights />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
