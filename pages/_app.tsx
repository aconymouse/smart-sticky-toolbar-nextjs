import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ScrollDirection } from '@/components/scroll-direction'
import { SiteHeader } from '@/components/site-header'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <ScrollDirection />
      <SiteHeader />
      <Component {...pageProps} />
    </>
  )
}
