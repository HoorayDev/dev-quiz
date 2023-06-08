import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
            <div id='modal-root' />
            <Main />
            <div id="toasts-portal"></div>
            <NextScript />
            </body>
        </Html>
    );
}
