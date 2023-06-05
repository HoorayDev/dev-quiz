import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { wrapper } from '~/store/store';
import Layout from '~/components/HOC/Layout';
import { FC, useEffect, useState } from 'react';
import Splash from '~/pages/splash';
import '~/styles/index.scss'

interface DefaultStaticProps {
  hasAppHeader?: boolean;
}

const _App: FC<AppProps> = ({ Component, pageProps: { hasAppHeader = false, ...pageProps } }: AppProps) => {

  //  TODO : here detech load
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoad(true), 1000)
  }, [])

  if(!load) return <Splash />


  return (
    <Layout hasAppHeader={hasAppHeader}>
        <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(_App);
export type { DefaultStaticProps };
