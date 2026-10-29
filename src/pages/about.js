import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import About from "@/components/Content/About";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "About us",
    description:
      "PT Tamura Trade Indonesia is an industrial supplier and general trading company serving electronics manufacturers in Indonesia.",
  },
  ja: {
    title: "会社概要",
    description:
      "PT Tamura Trade Indonesia は、インドネシアの電子機器メーカーを支える産業機器サプライヤー兼総合商社です。",
  },
};

export default function Page() {
  const lang = useLang();
  return (
    <SiteLayout>
      <Seo title={META[lang].title} description={META[lang].description} />
      <About />
    </SiteLayout>
  );
}
