import { Metadata } from "next";

import { Breadcrumbs, MaxWidthWrapper } from "@/components";
import {
  Brand,
  fetchAllData,
  Group,
  GroupSlug,
  GroupSlugsMap,
  Line,
  TBrand,
  TGroup,
} from "@/entities";
import { ContentSection, ModelsList, PageContent } from "@/widgets";

import { Paths, WpSectionsSlugs } from "@/configs";
import { connectToDb } from "@/shared";
import { notFound } from "next/navigation";

// ===========================

const Titles = {
  [GroupSlugsMap.design]:
    "Дизайн-радиаторы <brand> | купить | вертикальные и горизонтальные модели",
  [GroupSlugsMap.columns]: "Стальные трубчатые радиаторы <brand> | купить",
  [GroupSlugsMap.convectors]: "Внутрипольные конвекторы <brand> | большой выбор | купить",
};

const Descriptions = {
  [GroupSlugsMap.design]:
    "Большой выбор дизайн-радиаторов отопления от <brand>. Поможем подобрать подходящие модели. Доставка в любой город России. Официальная гарантия.",
  [GroupSlugsMap.columns]:
    "Большой выбор трубчатых радиаторов отопления от <brand>. Поможем подобрать подходящие модели. Доставка в любой город России. Официальная гарантия.",
  [GroupSlugsMap.convectors]:
    "Внутрипольные конвекторы с естественной и принудительной конвекцией от <brand>. Подберем модель под любой случай. Выгодные цены. Доставка по России.",
};

// ==========  Types / Paths ====================

type PageProps = {
  searchParams: any;
  params: {
    slug: string;
    groupSlug: string;
  };
};

export const generateStaticParams = async () => {
  await connectToDb();
  const brands = await Brand.find({}).lean();
  const lines = await Line.find({}).lean();
  const groups = await Group.find({}).lean();

  return brands
    .map((brand: any) => {
      const brandLines = lines.filter(l => l.brandSlug === brand.slug);

      const groupSlugs = groups
        .filter(g => brandLines.some(l => l.groupSlug === g.slug))
        .map(g => g.slug);

      return groupSlugs.map(groupSlug => {
        return {
          slug: brand.slug,
          groupSlug,
        };
      });
    })
    .flat();
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: brandSlug, groupSlug } = params;

  await connectToDb();
  const brand = (await Brand.findOne({ slug: brandSlug }).lean()) as TBrand;
  const group = (await Group.findOne({ slug: groupSlug }).lean()) as TGroup;
  return {
    title:
      Titles[groupSlug as GroupSlug].replace("<brand>", brand.name) ||
      `${brand.name} - ${group.fullName} | Купить `,
    description: Descriptions[groupSlug as GroupSlug].replace("<brand>", brand.name) || "",
  };
}

/**=========================
 * PAGE
============================*/

export default async function GroupPage({ searchParams, params }: PageProps) {
  /**
   * Get init data
   */
  await connectToDb();
  const { groupSlug = "design" } = params;
  const { groups, lines, brands } = await fetchAllData();
  const brand = brands.find(b => b.slug === params.slug);

  if (!brand) {
    notFound();
  }
  const brandContentIntroSlug = `${brand.slug}-intro`;

  const group = groups.find(g => g.slug === groupSlug);
  if (!group) {
    notFound();
  }

  const breadcrumbs = [
    {
      title: "Главная",
      url: Paths.home,
    },
    {
      title: brand.name,
      url: `${Paths.brands.root}/${brand.slug}`,
    },

    {
      title: group.name,
      url: "",
    },
  ];

  const pathname = `${Paths.brands.root}/${brand.slug}/${group.slug}`;

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-6 md:mt-16 pb-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="mt-6 text-3xl text-left max-w-[34rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        {group.fullName} от <span className="text-primary">{brand.name}</span>
      </h1>
      <div className="mt-2 max-w-[45rem]">
        <PageContent
          slug={brandContentIntroSlug}
          type="brand"
          part="full"
          className="leading-tight mt-0 pt-0"
        />
      </div>

      <section id="list" className="pt-12 md:pt-14">
        <ModelsList
          pathname={pathname}
          searchParams={searchParams}
          groupSlug={group.slug}
          brandSlug={brand.slug}
        />
      </section>

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">
          Как заказать {group.fullName.toLowerCase()} от {brand.name}
        </h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
