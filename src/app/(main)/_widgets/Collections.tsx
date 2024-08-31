import { ModelListCard } from "@/components";
import { Paths, Revalidate } from "@/configs";
import { fetchAllData, fetchModelsBySlugsArray, ModelDataBySlug } from "@/entities";
import { connectToDb } from "@/shared";
import { unstable_cache } from "next/cache";

/** ====================================
 * Constants
 =======================================*/

const VerticalModelsSlugs = [
  "tubog-2180",
  "velar-2180",
  "garmonia-a20-1500",
  "tubog-3180",
  "velar-3180",
  "warmmet-round-1750-42v",
  "rs-2-1750",
  "bataria-2-1750",
  "velar-qt1v-1750",
];
const MediumHeightModelSlugs = [
  "velar-3057",
  "tubog-3057",
  "tubog-2052",
  "warmmet-power-1250-76h",
  "velar-sh-1500",
  "bataria-3-500",
  "solo-g-1-1500",
  "garmonia-1-500",
];
const LowHeightRadiatorsSlugs = [
  "tubog-3037",
  "velar-3030",
  "garmonia-2-155",
  "warmmet-power-1500-76h",
  "velar-q60h-1500",
  "velar-2030",
  "quadrum-30h-1-1250",
];

/** ====================================
 * Render
 =======================================*/

export async function Collections() {
  await connectToDb();
  const verticalModels = await unstable_cache(
    async () => await fetchModelsBySlugsArray(VerticalModelsSlugs),
    ["cache:vertical-models"],
    { revalidate: Revalidate },
  )();

  const mediumModels = await unstable_cache(
    async () => await fetchModelsBySlugsArray(MediumHeightModelSlugs),
    ["cache:medium-models"],
    { revalidate: Revalidate },
  )();

  const lowHeightModels = await unstable_cache(
    async () => await fetchModelsBySlugsArray(LowHeightRadiatorsSlugs),
    ["cache:low-height-models"],
    { revalidate: Revalidate },
  )();

  const { brands, lines } = await fetchAllData();

  return (
    <section className="mt-20 text-left w-full" itemScope itemType="https://schema.org/ItemList">
      <h2 className="text-xl font-semibold text-center tracking-tight">Популярные подборки</h2>

      {/* 
					Вертикальные радиаторы 
			*/}

      <h3 className="mt-10 text-center text-base font-semibold">Вертикальные радиаторы</h3>
      <div className="mt-1 max-w-[40rem] text-center m-auto text-sm text-muted-foreground">
        <span className="text-red-600 font-semibold">Вертикальные радиаторы отопления</span> - это
        не только стильный элемент интерьера, но также и практичное решение, позволяющее сэкономить
        пространство. Благодаря высоте, каждая секция батареи обладает высокой тепловой мощностью.
      </div>
      <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {verticalModels.map(data => {
          const { model } = data;
          const line = lines.find(l => l.slug === model.lineSlug);
          if (!line) return null;
          const brand = brands.find(b => b.slug === line?.brandSlug);
          if (!brand) return null;

          return (
            <div key={model.slug} className="max-w-[12rem]">
              <ModelListCard model={model} brand={brand} line={line} />
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <a
          href={Paths.collections.hight}
          className="text-sm underline text-slate-900 hover:text-blue-600 cursor-pointer font-light"
        >
          Все модели вертикальных радиаторов отопления
        </a>
      </div>

      {/* 
					Стандартные радиаторы
			*/}
      <div className="mt-14 border-b-[1px] border-slate-300 shadow-xl"></div>

      <h3 className="mt-14 text-center text-base font-semibold">Стандартные радиаторы под окна</h3>
      <div className="mt-1 max-w-[40rem] text-center m-auto text-sm text-muted-foreground">
        Пространство под окном является наилучшим для установки отопительных приборов с точки зрения
        теплоотдачи. Именно поэтому,{" "}
        <span className="text-red-600 font-semibold">стандартные дизайн-радиаторы</span> по прежнему
        остаются популярным решением во время ремонта. Кроме того, они могут легко заменить старые
        батареи без переноса труб.
      </div>
      <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {mediumModels.map(data => {
          const { model } = data;
          const line = lines.find(l => l.slug === model.lineSlug);
          if (!line) return null;
          const brand = brands.find(b => b.slug === line?.brandSlug);
          if (!brand) return null;

          return (
            <div key={model.slug} className="max-w-[12rem]">
              <ModelListCard model={model} brand={brand} line={line} />
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <a
          href={Paths.collections.medium}
          className="text-sm underline text-slate-900 hover:text-blue-600 cursor-pointer font-light"
        >
          Все модели радиаторов отопления стандартной высоты
        </a>
      </div>

      {/* 
					Низкие радиаторы
			*/}
      <div className="mt-14 border-b-[1px] border-slate-300 shadow-xl"></div>

      <h3 className="mt-14 text-center text-base font-semibold">Низкие радиаторы отопления</h3>
      <div className="mt-1 max-w-[40rem] text-center m-auto text-sm text-muted-foreground">
        К низким радиаторам отопления относятся модели с высотой до 40 см. Они могут быть
        установлены как под окна с подоконниками высотой до 50 см, так и перед панорамными окнами
        при напольном монтаже. Кроме того,{" "}
        <span className="text-red-600 font-semibold">низкие дизайн-радиаторы</span> смотрятся
        интересно и украшают интерьер.
      </div>
      <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {lowHeightModels.map(data => {
          const { model } = data;
          const line = lines.find(l => l.slug === model.lineSlug);
          if (!line) return null;
          const brand = brands.find(b => b.slug === line?.brandSlug);
          if (!brand) return null;

          return (
            <div key={model.slug} className="max-w-[12rem]">
              <ModelListCard model={model} brand={brand} line={line} />
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <a
          href={Paths.collections.lowHeight}
          className="text-sm underline text-slate-900 hover:text-blue-600 cursor-pointer font-light"
        >
          Все модели низких радиаторов отопления
        </a>
      </div>
    </section>
  );
}
