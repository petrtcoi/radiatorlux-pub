/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Breadcrumbs, MaxWidthWrapper } from "@/components";
import { Paths, WpSectionsSlugs } from "@/configs";
import { fetchAllData, Line, TLine } from "@/entities";
import { connectToDb } from "@/shared";
import { ContentSection, ModelsList, PageContent } from "@/widgets";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

// ==========  Types / Paths ====================

type PageProps = {
  searchParams: any;
  params: {
    groupSlug: string;
    lineSlug: string;
  };
};

export const generateStaticParams = async () => {
  await connectToDb();
  const lines = await Line.find().lean();
  return lines.map(l => ({
    groupSlug: l.groupSlug,
    lineSlug: l.slug,
  }));
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // read route params
  const { lineSlug } = params;
  await connectToDb();
  const line = (await Line.findOne({ slug: lineSlug }).lean()) as TLine;

  return {
    title: `Радиаторы ${line.fullName} | Купить `,
    description: `Купить радиаторы ${line.fullName} по выгодной цене с официальной гарантией. Доставим в любой город России. Помощь в подборе и расчете требуемой мощности. `,
  };
}

// =========  Component  =============

export default async function LinePage(props: PageProps) {
  const { params, searchParams } = props;
  const { lines, groups, brands } = await fetchAllData();

  const line = lines.find(l => l.slug === params.lineSlug);
  const group = groups.find(g => g.slug === params.groupSlug);
  const brand = brands.find(b => b.slug === line?.brandSlug);

  if (!line || !group || !brand) {
    console.log("not found");
    notFound();
  }
  if (line.groupSlug !== group.slug) {
    notFound();
  }

  if (!line) notFound();

  const pathname = `/${group.slug}/${line.slug}`;

  /** ==============================
  * BreadCrumbs
  ================================== */

  const breadcrumbs = [
    {
      title: "Главная",
      url: Paths.home,
    },
    {
      title: group.name,
      url: `/${group.slug}`,
    },

    {
      title: line.name,
      url: "",
    },
  ];

  /** ==============================
  * Render
  ================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-12 pb-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="mt-6 text-3xl flex flex-row justify-start items-center gap-6 font-bold tracking-tight text-sate-900 sm:text-4xl ">
        <div>
          <Link href={`${Paths.brands.root}/${brand.slug}`} className="hover:opacity-75">
            <img src={`/assets/brands/${brand.logo}`} className="w-20 h-auto" />
          </Link>
        </div>
        {line.fullName}
      </h1>
      <div className="mt-4 max-w-[45rem]">
        <PageContent
          type={"line"}
          part={"short"}
          slug={line.slug}
          shortDesc={line.shortDesc}
          className="text-muted-foreground leading-tight"
        />
      </div>

      <section id="list" className="pt-12 md:pt-14">
        <ModelsList
          groupSlug={group.slug}
          lineSlug={line.slug}
          pathname={pathname}
          searchParams={searchParams}
        />
      </section>

      <PageContent
        slug={line.slug}
        type={"line"}
        part={"full"}
        className="mt-3"
        h2Header={line.aboutTitle}
      />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать {line.fullName}</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
