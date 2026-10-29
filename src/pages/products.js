import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Products from "@/components/Content/Products";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "Products",
    description:
      "Browse SMT, through-hole, conformal coating, marking and test equipment from Tamura, Koh Young, Panasonic, KIC, Anda, PTI and more.",
  },
  ja: {
    title: "製品",
    description:
      "Tamura、Koh Young、Panasonic、KIC、Anda、PTI などの SMT、挿入実装、コンフォーマルコーティング、マーキング、テスト装置をご覧いただけます。",
  },
};

export default function Page() {
  const lang = useLang();
  return (
    <SiteLayout>
      <Seo title={META[lang].title} description={META[lang].description} />
      <Products />
    </SiteLayout>
  );
}
