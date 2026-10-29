import { useRouter } from "next/router";

// Site languages. English is the default; Japanese lives under /ja/.
export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ja", label: "日本語", name: "Japanese" },
];

export function useLang() {
  const { locale } = useRouter();
  return locale === "ja" ? "ja" : "en";
}

// Returns obj[field + "Ja"] in Japanese when it exists, otherwise obj[field].
export function tr(obj, field, lang) {
  if (!obj) return "";
  return (lang === "ja" && obj[`${field}Ja`]) || obj[field];
}
