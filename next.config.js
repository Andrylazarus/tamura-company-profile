/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // English at /, Japanese at /ja/
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      // Old per-brand listing pages (e.g. /products/tamura/reflow) now live in
      // the filterable catalogue.
      {
        source: "/products/:brand/:page((?!details).*)",
        destination: "/products?brand=:brand",
        permanent: true,
      },
      // Detail pages that were placeholders in the old site.
      {
        source: "/products/:brand/details/uncon",
        destination: "/contact",
        permanent: true,
      },
      { source: "/uncon", destination: "/products", permanent: true },
      // Tamura reflow pages that only repeated the TNU-CR content.
      {
        source: "/products/tamura/details/:page(reflow_(?!tnu-cr).*)",
        destination: "/products?brand=tamura&category=smt&section=reflow",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
