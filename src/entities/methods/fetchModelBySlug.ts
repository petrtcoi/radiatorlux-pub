import { Revalidate } from "@/configs";
import { connectToDb, Stats } from "@/shared";
import { unstable_cache } from "next/cache";
import { Line, Model, Radiator, TModel } from "../models";
import { fetchAllData } from "./fetchAllData";

// ----------------------------------------------

type Props = {
  slug: string;
};

export type ModelDataBySlug = {
  model: TModel;
  lineSlug: string;
  brand: string;
  stats: Stats;
};

/**
 * Get model data by slug + Stats
 * return null in case of any error
 */
export async function fetchModelBySlug(props: Props): Promise<ModelDataBySlug | null> {
  const { slug } = props;

  await connectToDb();
  const { lines, brands } = await fetchAllData();
  console.log("all data fetched");
  try {
    // Найти модель по slug
    const model = (await Model.findOne({ slug }).lean()) as TModel;
    const line = lines.find(line => line.slug === model?.lineSlug);
    const brand = brands.find(brand => brand.slug === line?.brandSlug);

    if (!model || !line || !brand) {
      throw new Error("Model not found");
    }

    return {
      model,
      brand: brand.name,
      lineSlug: line.slug,

      stats: {
        price: { min: model.statsPriceMin || 0, max: model.statsPriceMax || 0 },
        length: { min: model.statsLengthMin || 0, max: model.statsLengthMax || 0 },
        heights: { min: model.statsHeightMin || 0, max: model.statsHeightMax || 0 },
        dt70: { min: model.statsDt70Min || 0, max: model.statsDt70Max || 0 },
        sections:
          model.statsSectionsMin && model.statsSectionsMax
            ? { min: model.statsSectionsMin, max: model.statsSectionsMax }
            : undefined,
      },
    };
  } catch (error) {
    console.error("getModelDataBySlug error:", error);
    return null;
  }
}

// ========== Promise Generator =============

type GenProps = {
  slug: string;
  revalidate?: number | false;
};

export const genFetchModelBySlugPromise = ({ slug }: GenProps) =>
  unstable_cache(async () => fetchModelBySlug({ slug }), ["cache:model", slug], {
    revalidate: Revalidate,
  })();
