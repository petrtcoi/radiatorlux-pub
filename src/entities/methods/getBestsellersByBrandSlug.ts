import { TModel } from "../models";
import { fetchAllData } from "./fetchAllData";

export async function getBestsellersByBrandSlug({
  slug: brandSlug,
}: {
  slug: string;
}): Promise<TModel[]> {
  const { lines, models, brands } = await fetchAllData();

  const brand = brands.find(b => b.slug === brandSlug);
  if (!brand) return [];

  const brandLines = lines.filter(l => l.brandSlug === brand?.slug);
  const brandLineSLugs = brandLines.map(l => l.slug);
  if (!brandLines.length) return [];

  return models
    .filter(m => brandLineSLugs.includes(m.lineSlug) && m.bestseller)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}
