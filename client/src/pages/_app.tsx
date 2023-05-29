import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import wrapper from '~/store/index';
import Layout from '~/components/HOC/Layout';
import { FC, useEffect, useState } from 'react';
import { Splash } from '~/pages/splash';
import '~/styles/index.scss'

interface DefaultStaticProps {
  hasAppHeader?: boolean;
}

const _App: FC<AppProps> = ({ Component, pageProps: { hasAppHeader = false, ...pageProps } }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps);

  //  TODO : here detech load
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoad(true), 1000)
  }, [])

  if(!load) return <Splash />


  return (
        <Provider store={store}>
            <Layout hasAppHeader={hasAppHeader}>
                <Component {...props} />
            </Layout>
        </Provider>
    )
}

export default _App;
export type { DefaultStaticProps };
