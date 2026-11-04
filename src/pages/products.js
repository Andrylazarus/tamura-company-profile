import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Products from "@/components/Content/Products";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "Solutions",
    description:
      "Solutions for SMT handling, marking, SMT, through-hole, conformal coating and factory automation from Tamura, Koh Young, Panasonic, KIC, Anda, PTI and more.",
  },
  ja: {
    title: "ソリューション",
    description:
      "Tamura、Koh Young、Panasonic、KIC、Anda、PTI などによる、SMTハンドリング、マーキング、SMT、挿入実装、コンフォーマルコーティング、工場自動化のソリューション。",
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
