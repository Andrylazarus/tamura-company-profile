import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Products from "@/components/Content/Products";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "Solutions",
    description:
      "Solutions for SMT material handling, marking, SMT, through-hole, cleaning, depaneling, coating, potting and factory automation from Tamura, Koh Young, Panasonic, KIC, Anda, PTI and more.",
  },
  ja: {
    title: "ソリューション",
    description:
      "Tamura、Koh Young、Panasonic、KIC、Anda、PTI などによる、SMT部材管理、マーキング、SMT、挿入実装、洗浄、基板分割、コーティング、ポッティング、ファクトリーオートメーションのソリューション。",
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
