import Document, { Html, Head, Main, NextScript } from "next/document";
import { BASE_PATH, langOfPath } from "@/i18n";

// Self-hosted fonts (SIL Open Font License). Declared here so the URLs get the
// GitHub Pages sub-path.
const FACES = [
  ["Big Shoulders", "big-shoulders-700", "600 800", "normal"],
  ["Instrument Sans", "instrument-sans-400", "400", "normal"],
  ["Instrument Sans", "instrument-sans-400-italic", "400", "italic"],
  ["Instrument Sans", "instrument-sans-700", "600 700", "normal"],
];
const fontCss = FACES.map(
  ([family, file, weight, style]) =>
    `@font-face{font-family:"${family}";src:url("${BASE_PATH}/fonts/${file}.woff") format("woff");font-weight:${weight};font-style:${style};font-display:swap}`,
).join("");

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initial = await Document.getInitialProps(ctx);
    return { ...initial, lang: langOfPath(ctx.pathname) };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta name="theme-color" content="#06175a" />
          <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
          <link
            rel="preload"
            href={`${BASE_PATH}/fonts/big-shoulders-700.woff`}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={`${BASE_PATH}/fonts/instrument-sans-400.woff`}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <style dangerouslySetInnerHTML={{ __html: fontCss }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
