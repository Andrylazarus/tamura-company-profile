import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#06175a" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/big-shoulders-700.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-sans-400.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
