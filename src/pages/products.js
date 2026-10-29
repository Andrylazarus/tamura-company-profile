import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import Products from "@/components/Content/Products";

export default function ProductsPage() {
  return (
    <SiteLayout>
      <Seo
        title="Products"
        description="Browse SMT, through-hole, test, conformal coating, marking and thermal profiling equipment from Tamura, Koh Young, KIC, Anda, PTI and more."
      />
      <Products />
    </SiteLayout>
  );
}
