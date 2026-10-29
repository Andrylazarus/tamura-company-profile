import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import About from "@/components/Content/About";

export default function AboutPage() {
  return (
    <SiteLayout>
      <Seo
        title="About us"
        description="PT Tamura Trade Indonesia is an industrial supplier and general trading company serving electronics manufacturers in Indonesia."
      />
      <About />
    </SiteLayout>
  );
}
