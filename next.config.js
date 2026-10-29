/** @type {import('next').NextConfig} */

// On GitHub Pages the site lives at https://<user>.github.io/<repo>/,
// so the build sets NEXT_PUBLIC_BASE_PATH=/<repo>. Locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // plain HTML/CSS/JS in ./out, no server needed
  trailingSlash: true, // /about/ -> about/index.html, which GitHub Pages serves
  basePath,
  images: { unoptimized: true },
  // Lint separately with `npm run lint`; do not block deploys on warnings.
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
