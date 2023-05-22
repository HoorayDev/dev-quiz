import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import wrapper from '../store/index';
import Layout from '~/components/HOC/Layout';
import '../styles/index.scss';

const _App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...props} />
            </Layout>
        </Provider>
    )
}

export default _App;
