import { Placeholder } from "@/components";
import { Revalidate } from "@/configs";
import { fetchAllData, FetchModelDataResult, fetchModelsByParams, GroupSlug } from "@/entities";
import { PropsStat } from "@/shared";
import { unstable_cache } from "next/cache";
import { ModelListCard } from "../../components/ModelListCard";
import { FiltersBlock, FiltersBlockData, PaginationComponent, statsToFiltersData } from "./widgets";

/**=========================
 *  Constants
============================*/

const LIMIT = 24;

type Props = {
  searchParams: any;
  pathname: string;

  brandSlug?: string;
  groupSlug?: GroupSlug;
  lineSlug?: string;
  modelSlug?: string;

  hideFilters?: boolean;

  colHeightLow?: boolean;
  colHeightMedium?: boolean;
  colHeightHight?: boolean;
};

/**=========================
 * Render
============================*/

export async function ModelsList(props: Props) {
  const {
    searchParams = {},
    pathname,
    groupSlug,
    lineSlug,
    modelSlug,
    hideFilters = false,
    brandSlug,
    colHeightLow = false,
    colHeightMedium = false,
    colHeightHight = false,
  } = props;

  /**
   *  Check search Params
   * */

  const propPage = searchParams.page ? Number(searchParams.page) : 1;
  const lengthMax = searchParams.lengthlte ? Number(searchParams.lengthlte) : undefined;
  const lengthMin = searchParams.lengthgte ? Number(searchParams.lengthgte) : undefined;

  const heightMax = searchParams.heightlte ? Number(searchParams.heightlte) : undefined;
  const heightMin = searchParams.heightgte ? Number(searchParams.heightgte) : undefined;

  const dt70Max = searchParams.dt70lte ? Number(searchParams.dt70lte) : undefined;
  const dt70Min = searchParams.dt70gte ? Number(searchParams.dt70gte) : undefined;
  const searchString = searchParams.search;

  const queryProps: Partial<PropsStat> = {
    lengthMax,
    lengthMin,
    heightMax,
    heightMin,
    dt70Min,
    dt70Max,
    searchString,
  };

  /**
   * Request to database
   */

  const { lines, brands } = await fetchAllData();

  const brandLineSlugs = brandSlug
    ? lines.filter(l => l.brandSlug === brandSlug && l.groupSlug === groupSlug).map(l => l.slug)
    : undefined;

  const initResult = await unstable_cache(
    async () =>
      await fetchModelsByParams({
        searchString,
        groupSlug,
        lineSlug,
        lineSlugsAllowed: brandLineSlugs,
        modelSlug,
        limit: LIMIT,
        page: propPage,
        height: {
          min: heightMin,
          max: heightMax,
        },
        length: {
          min: lengthMin,
          max: lengthMax,
        },
        dt70: {
          min: dt70Min,
          max: dt70Max,
        },
        colHeightLow,
        colHeightMedium,
        colHeightHight,
      }),
    [
      "cache:radiators",
      groupSlug as string,
      lineSlug as string,
      modelSlug as string,
      `${LIMIT}`,
      `${propPage}`,
      `${heightMin}`,
      `${heightMax}`,
      `${lengthMin}`,
      `${lengthMax}`,
      `${dt70Min}`,
      `${dt70Max}`,
      `${brandSlug || "all-brands"}`,
      searchString,
    ],
    { revalidate: Revalidate },
  )();

  const { stats, items, total, limit, page } = JSON.parse(
    JSON.stringify(initResult),
  ) as FetchModelDataResult;

  const filtersData = JSON.parse(
    JSON.stringify(statsToFiltersData({ stats, props: queryProps })),
  ) as FiltersBlockData;

  /** ===============================
	 * Render
	=================================== */

  return (
    <div className="flex flex-col items-stretch lg:flex-row gap-10 md:gap-2 lg:gap-16">
      {!hideFilters && (
        <div className="w-full lg:w-[10rem] flex-shrink-0 relative">
          <FiltersBlock filtersData={filtersData} pathname={pathname} searchParams={searchParams} />
        </div>
      )}

      <div className="flex flex-col gap-2 w-full">
        <div className="mb-2 text-sm tracking-tight">
          Найдено моделей: <span className="font-bold">{total.toLocaleString("ru-RU")}</span>
        </div>

        {total === 0 && (
          <Placeholder
            className="mt-4"
            title="По вашему запросу ничего не найдено."
            text="Пожалуйста, попробуйте изменить фильтры. Если вам нужна помощь в подборе радиаторов, свяжитесь с нашими менеджерами любым удобным способом и мы обязательно поможем."
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-stretch justify-start gap-10 gap-y-20 flex-wrap">
          {items.map(model => {
            const line = lines.find(l => l.slug === model.lineSlug);
            if (!line) return null;
            const brand = brands.find(b => b.slug === line.brandSlug);
            if (!brand) return null;

            return <ModelListCard key={model._id} model={model} line={line} brand={brand} />;
          })}
        </div>
        <div className="mt-12  flex-row justify-start hidden md:flex">
          <PaginationComponent
            limit={limit}
            page={page}
            total={total}
            pagesLength={10}
            pagesPrev={3}
            pathname={pathname}
            searchParams={searchParams}
          />
        </div>
        <div className="mt-12 flex flex-row justify-start md:hidden">
          <PaginationComponent
            limit={limit}
            page={page}
            total={total}
            pagesLength={3}
            pagesPrev={1}
            pathname={pathname}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}
