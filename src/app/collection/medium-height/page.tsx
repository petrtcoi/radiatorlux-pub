import { MaxWidthWrapper } from "@/components";
import { Paths, WpSectionsSlugs } from "@/configs";
import { ContentSection, ModelsList, PageContent } from "@/widgets";
import { Metadata } from "next";

// ===========================

export const metadata: Metadata = {
  title: "Радиаторы отопления стандартной высоты | под окна | купить",
  description:
    "Трубчатые и дизайн-радиаторы отопления для установки под подоконники стандартной высоты. Подходят для замены старых чугунных и алюминиевых батарей. Выбор моделей от ведущих производителей. Доставка по России. Гарантия качества.",
};

type PageProps = {
  searchParams: any;
};

/**=========================
 * PAGE
============================*/

export default async function LowHeightRadiators({ searchParams }: PageProps) {
  /**
   * Get init data
   */

  const pathname = `${Paths.collections.medium}`;
  const wpSlug = "medium-height";

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <h1 className="text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        Радиаторы отопления стандартной высоты
      </h1>
      <div className="mt-3 max-w-[45rem]">
        <PageContent
          slug={wpSlug}
          type="collection"
          part="short"
          className="text-muted-foreground leading-tight"
        />
      </div>

      <section id="list" className="pt-12 md:pt-14">
        <ModelsList pathname={pathname} searchParams={searchParams} colHeightMedium={true} />
      </section>

      <PageContent slug={wpSlug} type="collection" part="full" className="mt-3" />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать стандартные радиаторы отопления</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
