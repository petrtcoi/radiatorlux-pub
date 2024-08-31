/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Metadata } from "next";

import { LastNews, MaxWidthWrapper } from "@/components";
import { Brand, Line, TBrand } from "@/entities";
import { ContentSection, PageContent } from "@/widgets";

import { WpSectionsSlugs } from "@/configs";
import { CdnUrl, connectToDb, wpTags } from "@/shared";
import { notFound } from "next/navigation";
import { GroupLinks } from "./_widgets";
import { Bestsellers } from "./_widgets/Bestsellets";

// ==========  Types / Paths ====================

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  await connectToDb();
  const brands = await Brand.find({}).lean();
  return brands.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  await connectToDb();
  const brand = (await Brand.findOne({ slug: slug }).lean()) as TBrand;

  return {
    title: brand.metaTitle || `Купить продукцию ${brand.name} | RadiatorLux.ru`,
    description: brand.metaDescription || "",
  };
}

/**=========================
 * PAGE
============================*/

export default async function GroupPage({ params }: PageProps) {
  /**
   * Get init data
   */
  await connectToDb();

  const { slug } = params;
  const brand = (await Brand.findOne({ slug }).lean()) as TBrand;
  if (!brand) notFound();

  const lines = await Line.find({ brandSlug: brand.slug }).lean();
  const groupSlugs = lines.map(l => l.groupSlug);

  const brandContentIntroSlug = `${brand.slug}-intro`;
  const brandContentMainSlug = `${brand.slug}-main`;
  const brandLogoSrc = brand.logo;

  const wpBrandTagCode = wpTags[brand.slug]?.code;

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <img src={`${CdnUrl}/assets/brands/${brandLogoSrc}`} className="w-20 h-auto" />
      <h1 className="mt-8 text-3xl text-left max-w-[30rem] font-bold tracking-tight text-sate-900 sm:text-4xl ">
        <span className="font-semibold">Производитель</span>{" "}
        <span className="text-primary">{brand.name}</span>
      </h1>
      <div className="mt-2 max-w-[45rem]">
        <PageContent
          slug={brandContentIntroSlug}
          type="brand"
          part="full"
          className="leading-tight mt-0 pt-0"
        />
      </div>

      <section id="groups" className="mt-4 md:mt-8">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Продукция {brand.name}</h2>
        <GroupLinks groupSlugs={groupSlugs} brandSlug={brand.slug} brandName={brand.name} />
      </section>

      <Bestsellers brandSlug={brand.slug} />

      <LastNews
        className="mt-8 md:mt-14"
        perPage={10}
        tags={[wpBrandTagCode]}
        h2Title={`Актуальные новости производителя ${brand.name}`}
        text="Актуальные новости производителя, акции, новинки, обзоры и аналитика. Будьте в курсе последних событий."
      />

      <PageContent slug={brandContentMainSlug} type="brand" part="full" className="mt-3" />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать продукции {brand.name}</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
