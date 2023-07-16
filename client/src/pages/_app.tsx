import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { wrapper } from '~/store/store';
import Layout from '~/components/HOC/Layout';
import { FC, useEffect, useState } from 'react';
import Splash from '~/pages/splash';
import '~/styles/index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface DefaultStaticProps {
  hasAppHeader?: boolean;
  hasAppFooter?: boolean;
}

const queryClient = new QueryClient();

// TODO : hasAppFooter = false
const _App: FC<AppProps> = ({ Component, pageProps: { hasAppHeader = false, hasAppFooter = true, ...pageProps } }: AppProps) => {
  //  TODO : here detech load
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoad(true), 1000)
  }, [])

  if(!load) return <Splash />

  return (
      <QueryClientProvider client={queryClient}>
        <Layout hasAppHeader={hasAppHeader} hasAppFooter={hasAppFooter}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>

  )
}

export default wrapper.withRedux(_App);
export type { DefaultStaticProps };
