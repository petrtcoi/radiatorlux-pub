"use server";

import { connectToDb } from "@/shared";
import { genFetchModelBySlugPromise, ModelDataBySlug } from "./fetchModelBySlug";

export const fetchModelsBySlugsArray = async (slugs: string[]): Promise<ModelDataBySlug[]> => {
  const results = [];
  await connectToDb();

  for (const slug of slugs) {
    const modelPromise = genFetchModelBySlugPromise({ slug });
    const data = await modelPromise;
    if (data !== null) {
      results.push(data);
    }
  }

  return JSON.parse(JSON.stringify(results));
};
