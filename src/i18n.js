import { useRouter } from "next/router";

// Site languages. English is the default; Japanese pages live under /ja/.
export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ja", label: "日本語", name: "Japanese" },
];

const JA = /^\/ja(?=\/|$|\?)/;

export function langOfPath(path = "") {
  return JA.test(path) ? "ja" : "en";
}

export function useLang() {
  const { pathname } = useRouter();
  return langOfPath(pathname);
}

// "/about" -> "/ja/about" for Japanese; leaves external links and /ja links alone.
export function localize(href, lang) {
  if (lang !== "ja" || typeof href !== "string" || !href.startsWith("/"))
    return href;
  if (JA.test(href)) return href;
  return href === "/" ? "/ja" : `/ja${href}`;
}

// The same page in the other language.
export function switchPath(asPath = "/", lang) {
  const clean = asPath.replace(JA, "") || "/";
  return lang === "ja"
    ? clean === "/"
      ? "/ja"
      : `/ja${clean.startsWith("?") ? "/" + clean : clean}`
    : clean;
}

// Strip /ja so the rest of the site can compare paths.
export function basePathname(pathname = "") {
  return pathname.replace(JA, "") || "/";
}

// Returns obj[field + "Ja"] in Japanese when it exists, otherwise obj[field].
export function tr(obj, field, lang) {
  if (!obj) return "";
  return (lang === "ja" && obj[`${field}Ja`]) || obj[field];
}

// Files in /public, prefixed with the site's sub-path on GitHub Pages.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function asset(src) {
  return typeof src === "string" && src.startsWith("/") ? BASE_PATH + src : src;
}
