import NextLink from "next/link";
import { localize, useLang } from "@/i18n";

/** next/link that keeps visitors in their language (adds /ja/ on Japanese pages). */
export default function Link({ href, ...rest }) {
  const lang = useLang();
  const target =
    typeof href === "string"
      ? localize(href, lang)
      : { ...href, pathname: localize(href.pathname, lang) };
  return <NextLink href={target} {...rest} />;
}
