import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Services from "@/components/Content/Services";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "Services",
    description:
      "Technical support, spare parts, new and used machines, sourcing and business networking from PT Tamura Trade Indonesia.",
  },
  ja: {
    title: "サービス",
    description:
      "PT Tamura Trade Indonesia の技術サポート、スペアパーツ、新品・中古装置、調達、ビジネスネットワーク。",
  },
};

export default function Page() {
  const lang = useLang();
  return (
    <SiteLayout>
      <Seo title={META[lang].title} description={META[lang].description} />
      <Services />
    </SiteLayout>
  );
}
