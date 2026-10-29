import Link from "next/link";
import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import { useLang } from "@/i18n";

const T = {
  en: {
    title: "Page not found",
    code: "Error 404",
    heading: "This page has moved or no longer exists",
    text: "Search the product catalogue or go back to the home page.",
    browse: "Browse products",
    home: "Go to home page",
  },
  ja: {
    title: "ページが見つかりません",
    code: "エラー 404",
    heading: "このページは移動したか、存在しません",
    text: "製品カタログを検索するか、ホームページに戻ってください。",
    browse: "製品を見る",
    home: "ホームへ戻る",
  },
};

export default function NotFound() {
  const t = T[useLang()];
  return (
    <SiteLayout>
      <Seo title={t.title} />
      <section className="not-found">
        <div className="container">
          <p className="not-found__code">{t.code}</p>
          <h1 className="h1">{t.heading}</h1>
          <p className="lead" style={{ margin: "18px 0 32px" }}>
            {t.text}
          </p>
          <div className="btn-row">
            <Link href="/products" className="btn btn-primary">
              {t.browse}
            </Link>
            <Link href="/" className="btn btn-outline">
              {t.home}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
