import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Contacts from "@/components/Content/Contacts";
import { useLang } from "@/i18n";

const META = {
  en: {
    title: "Contact",
    description:
      "Contact PT Tamura Trade Indonesia in Kalideres, Jakarta Barat for quotations, technical support and spare parts.",
  },
  ja: {
    title: "お問い合わせ",
    description:
      "お見積り、技術サポート、スペアパーツのご依頼は、ジャカルタ西部カリデレスの PT Tamura Trade Indonesia まで。",
  },
};

export default function Page() {
  const lang = useLang();
  return (
    <SiteLayout>
      <Seo title={META[lang].title} description={META[lang].description} />
      <Contacts />
    </SiteLayout>
  );
}
