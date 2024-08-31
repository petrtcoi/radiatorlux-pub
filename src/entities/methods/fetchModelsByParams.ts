"use server";

import { connectToDb, Stats } from "@/shared";
import { GroupSlug, Line, Model, TModel } from "../models";

//================================================

const VerticalMinHeight = 1500;
const lowHeightMaxHeight = 400;
const mediumHeightMinHeight = 450;
const mediumHeightMaxHeight = 620;
const SOME_LARGE_HEIGHT = 5000;

type FetchModelParams = {
  searchString: string;
  groupSlug: GroupSlug;
  lineSlug: string;
  modelSlug: string;
  lineSlugsAllowed?: string[];

  height: {
    min?: number;
    max?: number;
  };
  length: {
    min?: number;
    max?: number;
  };
  dt70: {
    min?: number;
    max?: number;
  };

  colHeightLow?: boolean;
  colHeightMedium?: boolean;
  colHeightHight?: boolean;

  limit: number;
  page: number;
};

export type FetchModelDataResult = {
  total: number;
  stats: Stats;
  page: number;
  limit: number;
  items: TModel[];
};

//================================================

/**
 * Fetch radiators by params with pagination
 */
export const fetchModelsByParams = async (
  props: Partial<FetchModelParams>,
): Promise<FetchModelDataResult> => {
  const {
    searchString,
    groupSlug,
    lineSlug,
    lineSlugsAllowed,
    modelSlug,
    height,
    length,
    dt70,
    colHeightLow = false,
    colHeightMedium = false,
    colHeightHight = false,

    limit = 24,
    page = 1,
  } = props;

  await connectToDb();

  // Prepare query and statsQuery
  const query: Partial<Record<keyof TModel | "$and", any>> = {};
  const statsQuery: Partial<Record<keyof TModel | "$and", any>> = {};

  // boolean flags filter
  if (colHeightLow) {
    query.colHeightLow = true;
  }
  if (colHeightMedium) {
    query.colHeightMedium = true;
  }
  if (colHeightHight) {
    query.colHeightHight = true;
  }

  // predefined height filter

  let colTypeHeightMin: number = 0;
  let colTypeHeightMax: number = SOME_LARGE_HEIGHT;
  if (colHeightHight) {
    colTypeHeightMin = VerticalMinHeight;
  }
  if (colHeightMedium) {
    colTypeHeightMin = mediumHeightMinHeight;
    colTypeHeightMax = mediumHeightMaxHeight;
  }
  if (colHeightLow) {
    colTypeHeightMax = lowHeightMaxHeight;
  }

  // slugs filter
  if (modelSlug) {
    query.slug = modelSlug;
    statsQuery.slug = modelSlug;
  } else if (lineSlug) {
    query.lineSlug = lineSlug;
    statsQuery.lineSlug = lineSlug;
  } else if (lineSlugsAllowed && lineSlugsAllowed.length > 0) {
    query.lineSlug = { $in: lineSlugsAllowed };
    statsQuery.lineSlug = { $in: lineSlugsAllowed };
  } else if (groupSlug) {
    const lines = await Line.find({ groupSlug });
    query.lineSlug = { $in: lines.map(l => l.slug) };
    statsQuery.lineSlug = { $in: lines.map(l => l.slug) };
  }

  // searchString filter
  if (searchString) {
    const words = searchString.split(" ").filter(Boolean);

    query["$and"] = words.map(word => ({
      fullName: { $regex: word, $options: "i" },
    }));
    statsQuery["$and"] = words.map(word => ({
      fullName: { $regex: word, $options: "i" },
    }));
  }

  // height filter
  if (height || colHeightHight || colHeightMedium || colHeightLow) {
    query.statsHeightMax = { $gte: Math.max(height?.min || 0, colTypeHeightMin) };
    query.statsHeightMin = { $lte: Math.min(height?.max || SOME_LARGE_HEIGHT, colTypeHeightMax) };
  }

  // length filter
  if (length) {
    if (length.min !== undefined) query.statsLengthMax = { $gte: length.min };
    if (length.max !== undefined) query.statsLengthMin = { $lte: length.max };
  }

  // dt70 filter
  if (dt70) {
    if (dt70.min !== undefined) query.statsDt70Max = { $gte: dt70.min };
    if (dt70.max !== undefined) query.statsDt70Min = { $lte: dt70.max };
  }

  // Make request
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * limit;

  const totalModels = await Model.countDocuments(query);

  const models = (await Model.find(query, {}, { skip, limit: safeLimit })
    .sort({ order: 1 })
    .lean()) as TModel[];

  const statsModels = (await Model.find(statsQuery, {}, {}).sort({ order: 1 }).lean()) as TModel[];

  // Формируем ответ
  const result: FetchModelDataResult = {
    total: totalModels,
    stats: {
      heights: {
        min: Math.max(Math.min(...statsModels.map(m => m.statsHeightMin || 0)), colTypeHeightMin),
        max: Math.min(Math.max(...statsModels.map(m => m.statsHeightMax || 0)), colTypeHeightMax),
      },
      length: {
        min: Math.min(...statsModels.map(m => m.statsLengthMin || 0)),
        max: Math.max(...statsModels.map(m => m.statsLengthMax || 0)),
      },
      dt70: {
        min: Math.min(...statsModels.map(m => m.statsDt70Min || 0)),
        max: Math.max(...statsModels.map(m => m.statsDt70Max || 0)),
      },
      price: {
        min: Math.min(...statsModels.map(m => m.statsPriceMin || 0)),
        max: Math.max(...statsModels.map(m => m.statsPriceMax || 0)),
      },
    },
    page,
    limit: safeLimit,
    items: models,
  };

  return JSON.parse(JSON.stringify(result));
};
