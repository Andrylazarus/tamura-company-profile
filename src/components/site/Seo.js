import Head from "next/head";
import { company } from "@/data/company";

export default function Seo({ title, description }) {
  const full = title ? `${title} | ${company.shortName}` : company.name;
  return (
    <Head>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
