// ============= Types =============

import { ModelListCard } from "@/components";
import { fetchAllData, getBestsellersByBrandSlug, TModel } from "@/entities";

type Props = {
  brandSlug: string;
};

// ============= Component =============

export async function Bestsellers(props: Props) {
  const { brandSlug } = props;

  const { lines, brands } = await fetchAllData();
  const brand = brands.find(b => b.slug === brandSlug);
  if (!brand) return null;

  const bestsellers = JSON.parse(
    JSON.stringify(await getBestsellersByBrandSlug({ slug: brandSlug })),
  ) as TModel[];

  if (!bestsellers.length) return null;

  return (
    <section className="mt-20 text-left w-full" itemScope itemType="https://schema.org/ItemList">
      <h2 className="text-xl font-semibold text-left tracking-tight">
        Лидеры продаж от {brand.name}
      </h2>

      <div className="mt-8 flex flex-row items-stretch justify-start gap-8 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {bestsellers.map(model => {
          const line = lines.find(l => l.slug === model.lineSlug);
          if (!line) return null;
          const brand = brands.find(b => b.slug === line.brandSlug);
          if (!brand) return null;

          return (
            <div key={model.slug} className="max-w-[15rem]">
              <ModelListCard model={model} brand={brand} line={line} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
