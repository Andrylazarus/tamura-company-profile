import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import HomeContent from "@/components/Content/Home";
import { useLang } from "@/i18n";

const DESC = {
  en: "PT Tamura Trade Indonesia supplies SMT, through-hole, coating, test and marking equipment to electronics manufacturers in Indonesia, with local technical support and spare parts.",
  ja: "PT Tamura Trade Indonesia は、インドネシアの電子機器メーカーに SMT、挿入実装、コーティング、テスト、マーキング装置を提供し、現地での技術サポートとスペアパーツでお客様を支えます。",
};

export default function Home() {
  const lang = useLang();
  return (
    <SiteLayout header="overlay">
      <Seo description={DESC[lang]} />
      <HomeContent />
    </SiteLayout>
  );
}
