import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import wrapper from '../store/index'

const _App = ({ Component, pageProps }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}

export default _App;
