import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Services from "@/components/Content/Services";

export default function ServicesPage() {
  return (
    <SiteLayout>
      <Seo
        title="Services"
        description="Technical support, spare parts, new and used machines, sourcing and business networking from PT Tamura Trade Indonesia."
      />
      <Services />
    </SiteLayout>
  );
}
