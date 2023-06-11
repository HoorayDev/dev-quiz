import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
            <div id='modal-root' />
            <div id="toasts-portal" />
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
