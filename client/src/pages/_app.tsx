import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import wrapper from '~/store/index';
import Layout from '~/components/HOC/Layout';
import { FC } from 'react';
import '~/styles/index.scss'

interface DefaultStaticProps {
  hasAppHeader?: boolean;
}

const _App: FC<AppProps> = ({ Component, pageProps: { hasAppHeader = false, ...pageProps } }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps);

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