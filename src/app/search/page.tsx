import { Metadata } from "next";

import { MaxWidthWrapper } from "@/components";
import { ContentSection, ModelsList } from "@/widgets";

import { Paths, WpSectionsSlugs } from "@/configs";
import { redirect } from "next/navigation";

// ===========================

export const metadata: Metadata = {
  title: "Результаты поиска радиаторов | купить",
  description:
    "Большой выбор трубчатых радиаторов отопления от ведущих российских производителей. Поможем подобрать подходящие модели. Доставка в любой город России. Официальная гарантия.",
};

// ==========  Types / Paths ====================

type PageProps = {
  searchParams: any;
  params: {
    groupSlug: string;
  };
};

/**=========================
 * PAGE
============================*/

export default async function SearchResultsPage({ searchParams }: PageProps) {
  /**
   * Get init data
   */
  const searchString = searchParams.search;

  if (!searchString) {
    redirect(Paths.home);
  }

  const pathname = Paths.searchResults;

  /** ===============================
	 * Render
	=================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-16 pb-24"}>
      <h1 className="text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl ">
        Результаты поиска: {searchString}
      </h1>
      <section id="list" className="pt-12 md:pt-14">
        <ModelsList pathname={pathname} searchParams={searchParams} hideFilters={true} />
      </section>

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2 className="tracking-tight">Как заказать радиаторы отопления</h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>
    </MaxWidthWrapper>
  );
}
