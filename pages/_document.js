import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <script src="/google-translate.js"></script>
                <script
                    type="text/javascript"
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                ></script>
            </Head>
            <body>
                {/* Hidden Google Translate Element */}
                <div id="google_translate_element" style={{ display: 'none' }}></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
