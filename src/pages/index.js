import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import HomeContent from "@/components/Content/Home";

export default function Home() {
  return (
    <SiteLayout header="overlay">
      <Seo description="PT Tamura Trade Indonesia supplies SMT, through-hole, coating, test and marking equipment to electronics manufacturers in Indonesia, with local technical support and spare parts." />
      <HomeContent />
    </SiteLayout>
  );
}
