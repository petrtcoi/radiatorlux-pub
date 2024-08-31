import { Metadata } from "next";

import { LastNews, MaxWidthWrapper } from "@/components";
import { fetchAllData, Group, GroupSlug, GroupSlugsMap, TGroup } from "@/entities";
import { ContentSection, ModelsList, PageContent } from "@/widgets";

import { WpSectionsSlugs } from "@/configs";
import { connectToDb, wpTags } from "@/shared";
import { notFound } from "next/navigation";

// ===========================

const Titles = {
  [GroupSlugsMap.design]:
    "Дизайн-радиаторы отопления | купить | вертикальные и горизонтальные модели",
  [GroupSlugsMap.columns]: "Стальные трубчатые радиаторы от российских производителей | купить",
  [GroupSlugsMap.convectors]: "Внутрипольные конвекторы | большой выбор | купить",
};

const Descriptions = {
  [GroupSlugsMap.design]:
    "Большой выбор дизайн-радиаторов отопления от ведущих российских производителей. Поможем подобрать подходящие модели. Доставка в любой город России. Официальная гарантия.",
  [GroupSlugsMap.columns]:
    "Большой выбор трубчатых радиаторов отопления от ведущих российских производителей. Поможем подобрать подходящие модели. Доставка в любой город России. Официальная гарантия.",
  [GroupSlugsMap.convectors]:
    "Внутрипольные конвекторы с естественной и принудительной конвекцией. Подберем модель под любой случай. Выгодные цены. Доставка по России.",
};

// ==========  Types / Paths ====================

type PageProps = {
  searchParams: any;
  params: {
    groupSlug: string;
  };
};

export const generateStaticParams = async () => {
  await connectToDb();
  const groups = await Group.find({}).lean();
  return groups.map(g => ({ groupSlug: g.slug }));
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { groupSlug } = params;
  await connectToDb();
  const group = (await Group.findOne({ slug: groupSlug }).lean()) as TGroup;
  return {
    title: Titles[groupSlug as GroupSlug] || `${group.fullName} | Купить `,
    description: Descriptions[groupSlug as GroupSlug] || "",
  };
}

/**=========================
 * PAGE
============================*/

export default async function GroupPage({ searchParams, params }: PageProps) {
  /**
   * Get init data
   */

  const { groupSlug = "design" } = params;
  const { groups } = await fetchAllData();

  const group = groups.find(g => g.slug === groupSlug);
  if (!group) {
    notFound();
  }

  const pathname = `/${group.slug}`;
  const wpGroupTagCode = wpTags[group.slug]?.code;

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <h1 className="text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        {group.fullName}
      </h1>
      <div className="mt-3 max-w-[45rem]">
        <PageContent
          slug={group.slug}
          type="group"
          part="short"
          className="text-muted-foreground leading-tight"
        />
      </div>

      <section id="list" className="pt-12 md:pt-14">
        <ModelsList pathname={pathname} searchParams={searchParams} groupSlug={group.slug} />
      </section>

      <LastNews
        perPage={10}
        tags={[wpGroupTagCode]}
        h2Title={`Последние новости: ${group.name}`}
        text="Следите за новостями и акциями на нашем сайте. Актуальная информация о новинках и скидках. События и мероприятия от производителей."
      />

      <PageContent
        slug={group.slug}
        type="group"
        part="full"
        className="mt-3"
        h2Header={group.aboutTitle}
      />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать {group.fullName.toLowerCase()}</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
