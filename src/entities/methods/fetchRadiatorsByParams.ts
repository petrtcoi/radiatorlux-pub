"use server";

import { connectToDb, Stats } from "@/shared";
import { GroupSlug, Line, Model, Radiator, TRadiator } from "../models";

//================================================

type FetchRadiatorsParams = {
  groupSlug: GroupSlug;
  lineSlug: string;
  modelSlug: string;

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

  limit: number;
  page: number;
};

type FetchRadiatorsResult = {
  total: number;
  page: number;
  limit: number;
  stats: Stats;
  items: TRadiator[];
};

//================================================

/**
 * Fetch radiators by params with pagination
 */
export const fetchRadiatorsByParams = async (
  props: Partial<FetchRadiatorsParams>,
): Promise<FetchRadiatorsResult> => {
  const { groupSlug, lineSlug, modelSlug, height, length, dt70, limit = 24, page = 1 } = props;

  await connectToDb();

  // Prepare query and statsQuery
  const query: any = {};
  const statsQuery: any = {};

  // model - line - group filters

  if (modelSlug) {
    query.modelSlug = { $eq: modelSlug };
    statsQuery.modelSlug = { $eq: modelSlug };
    //
  } else if (lineSlug) {
    const models = await Model.find({ lineSlug: lineSlug });
    query.modelSlug = { $in: models.map(m => m.slug) };
    statsQuery.modelSlug = { $in: models.map(m => m.slug) };
    //
  } else if (groupSlug) {
    const lines = await Line.find({ groupSlug: groupSlug });
    const models = await Model.find({
      lineSlug: { $in: lines.map(l => l.slug) },
    });
    query.modelSlug = { $in: models.map(m => m.slug) };
    statsQuery.modelSlug = { $in: models.map(m => m.slug) };
  }

  // height filter
  if (height) {
    if (height.min !== undefined) query.height = { ...query.height, $gte: height.min };
    if (height.max !== undefined) query.height = { ...query.height, $lte: height.max };
  }

  // length filter
  if (length) {
    if (length.min !== undefined) query.length = { ...query.length, $gte: length.min };
    if (length.max !== undefined) query.length = { ...query.length, $lte: length.max };
  }

  // dt70 filter
  if (dt70) {
    if (dt70.min !== undefined) query.dt70 = { ...query.dt70, $gte: dt70.min };
    if (dt70.max !== undefined) query.dt70 = { ...query.dt70, $lte: dt70.max };
  }

  // Make request
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * limit;

  const queryResult = await Radiator.aggregate([
    { $match: query },
    {
      $facet: {
        paginatedResults: [{ $skip: skip }, { $limit: safeLimit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);
  const statsResult = await Radiator.aggregate([
    { $match: statsQuery },
    {
      $facet: {
        stats: [
          {
            $group: {
              _id: null,
              minHeight: { $min: "$height" },
              maxHeight: { $max: "$height" },
              minLength: { $min: "$length" },
              maxLength: { $max: "$length" },
              minPriceRub: { $min: "$priceRub" },
              maxPriceRub: { $max: "$priceRub" },
              minSections: { $min: "$sections" },
              maxSections: { $max: "$sections" },
              minDt70: { $min: "$dt70" },
              maxDt70: { $max: "$dt70" },
            },
          },
        ],
      },
    },
  ]);

  const paginatedResults = queryResult[0].paginatedResults;
  const stats = statsResult[0].stats[0] || {};
  const totalCount = queryResult[0].totalCount[0] ? queryResult[0].totalCount[0].count : 0;

  // Формируем ответ
  const result: FetchRadiatorsResult = {
    total: totalCount,
    page,
    limit: safeLimit,
    stats: {
      price: { min: stats.minPriceRub, max: stats.maxPriceRub },
      length: { min: stats.minLength, max: stats.maxLength },
      sections: stats.minSections ? { min: stats.minSections, max: stats.maxSections } : undefined,
      heights: { min: stats.minHeight, max: stats.maxHeight },
      dt70: { min: stats.minDt70, max: stats.maxDt70 },
    },
    items: paginatedResults,
  };

  return JSON.parse(JSON.stringify(result));
};
