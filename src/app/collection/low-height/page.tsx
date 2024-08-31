import { MaxWidthWrapper } from "@/components";
import { Paths, WpSectionsSlugs } from "@/configs";
import { ContentSection, ModelsList, PageContent } from "@/widgets";
import { Metadata } from "next";

// ===========================

export const metadata: Metadata = {
  title: "Низкие радиаторы отопления | высотой от 40 см | купить",
  description:
    "Низкие радиаторы отопления для установки под окнами с небольшими подоконниками или для напольного монтажа. Выбор моделей от ведущих производителей. Доставка по России. Гарантия качества.",
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

  const pathname = `${Paths.collections.lowHeight}`;
  const wpSlug = "low-height";

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <h1 className="text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        Низкие радиаторы отопления
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
        <ModelsList pathname={pathname} searchParams={searchParams} colHeightLow={true} />
      </section>

      <PageContent slug={wpSlug} type="collection" part="full" className="mt-3" />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать низкие радиаторы отопления</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
