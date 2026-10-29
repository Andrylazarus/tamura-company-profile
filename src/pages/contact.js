import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Contacts from "@/components/Content/Contacts";

export default function ContactPage() {
  return (
    <SiteLayout>
      <Seo
        title="Contact"
        description="Contact PT Tamura Trade Indonesia in Kalideres, Jakarta Barat for quotations, technical support and spare parts."
      />
      <Contacts />
    </SiteLayout>
  );
}
