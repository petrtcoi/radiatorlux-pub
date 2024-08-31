import { MaxWidthWrapper } from "@/components";
import { Paths, WpSectionsSlugs } from "@/configs";
import { ContentSection, ModelsList, PageContent } from "@/widgets";
import { Metadata } from "next";

// ===========================

export const metadata: Metadata = {
  title: "Вертикальные радиаторы отопления | высотой от 150 см | купить",
  description:
    "Вертикальные радиаторы отопления для помещений с высокими потолками. Выбор моделей от ведущих производителей. Доставка по России. Гарантия качества.",
};

type PageProps = {
  searchParams: any;
};

/**=========================
 * PAGE
============================*/

export default async function VerticalRadiators({ searchParams }: PageProps) {
  /**
   * Get init data
   */

  const pathname = `${Paths.collections.hight}`;
  const wpSlug = "vertical";

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <h1 className="text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        Вертикальные радиаторы отопления
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
        <ModelsList pathname={pathname} searchParams={searchParams} colHeightHight={true} />
      </section>

      <PageContent slug={wpSlug} type="collection" part="full" className="mt-3" />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать вертикальные радиаторы отопления</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
