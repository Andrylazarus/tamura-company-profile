import Link from "next/link";
import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <Seo title="Page not found" />
      <section className="not-found">
        <div className="container">
          <p className="not-found__code">Error 404</p>
          <h1 className="h1">This page has moved or no longer exists</h1>
          <p className="lead" style={{ margin: "18px 0 32px" }}>
            Search the product catalogue or go back to the home page.
          </p>
          <div className="btn-row">
            <Link href="/products" className="btn btn-primary">
              Browse products
            </Link>
            <Link href="/" className="btn btn-outline">
              Go to home page
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
