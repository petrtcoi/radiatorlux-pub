import { Feature, ImgSlider } from "@/components";
import { Paths } from "@/configs";
import { TBrand, TLine, TModel } from "@/entities";
import { cn, Stats } from "@/shared";
import Link from "next/link";
import { Button } from "../ui/button";

// ----------------------------------------------

type Props = {
  className?: string;
  model: TModel;
  brand: TBrand;
  line: TLine;
};

// ----------------------------------------------

export function ModelListCard(props: Props) {
  const { model, brand, line, className } = props;

  // --------- Prepare data ---------

  const imgAlt = `${model.name}`;
  const modelImages = (model.images || "")
    .split(",")
    .map(i => ({ src: `/assets/models/${model.assetsPath}/${i}`, alt: imgAlt }))
    .slice(0, 6);
  const modelLink = `/${line.groupSlug}/${line.slug}/${model.slug}`;
  const itemsCount = model.statsRadiatorsCount;

  const stats: Stats = {
    price: {
      min: model.statsPriceMin || 0,
      max: model.statsPriceMax || 0,
    },
    length: {
      min: model.statsLengthMin || 0,
      max: model.statsLengthMax || 0,
    },
    heights: {
      min: model.statsHeightMin || 0,
      max: model.statsHeightMax || 0,
    },
    dt70: {
      min: model.statsDt70Min || 0,
      max: model.statsDt70Max || 0,
    },
    sections: {
      min: model.statsSectionsMin || 0,
      max: model.statsSectionsMax || 0,
    },
  };

  // --------- Render ------------------------

  return (
    <div
      className={cn(
        "rounded-xl flex flex-shrink-0 flex-col gap-0 h-full justify-between items-stretch",
        className,
      )}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div>
        <div className="w-ful; aspect-square overflow-hidden relative justify-start">
          <Link href={modelLink}>
            <ImgSlider images={modelImages} />
          </Link>
        </div>

        <div itemProp="name" className="mt-3 text-sm font-bold">
          <Link href={modelLink} className="hover:opacity-70 ">
            {model.fullName}
          </Link>
        </div>

        <div className="mt-3 text-xs font-light flex flex-col justify-start gap-1">
          <Feature
            itemProp="brand"
            title={"производитель"}
            value={brand.name}
            link={`${Paths.brands.root}/${brand.slug}`}
          />
          {line.name && (
            <Feature
              title={"коллекция"}
              value={line.name}
              link={`/${line.groupSlug}/${line.slug}`}
            />
          )}

          {model.convType && (
            <Feature itemProp="width" title={"тип конвекции"} value={model.convType} />
          )}

          <Feature
            itemProp="height"
            title={"высота"}
            value={
              stats.heights.min === stats.heights.max
                ? `${stats.heights.min} мм`
                : `${stats.heights.min}-${stats.heights.max} мм`
            }
          />
          {model.interAxis && (
            <Feature itemProp="height" title={"м/о расстояние"} value={`${model.interAxis} мм`} />
          )}
          <Feature
            itemProp="width"
            title={"длина"}
            value={
              stats.length.min === stats.length.max
                ? `${stats.length.min} мм`
                : `${stats.length.min}-${stats.length.max} мм`
            }
          />
          {stats.sections && (
            <Feature title={"секций"} value={`${stats.sections.min}-${stats.sections.max}`} />
          )}
          <Feature title={"(ΔT 70°)"} value={`${stats.dt70.min}-${stats.dt70.max} Вт`} />
          {itemsCount && <Feature title={"радиаторов"} value={`${itemsCount} шт.`} />}

          <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
            <meta itemProp="priceCurrency" content="RUB" />
            <meta itemProp="lowPrice" content={`${stats.price.min}`} />
            <Feature
              highlighted={true}
              title={"цена"}
              value={`${(stats.price?.min || 0).toLocaleString("ru-RU")} руб.`}
            />
          </div>
        </div>
      </div>
      <div>
        <Link href={modelLink} className="hover:opacity-70">
          <Button
            className="mt-5 w-full bg-slate-600 text-slate-50 hover:bg-slate-800"
            variant={"secondary"}
          >
            Выбрать
          </Button>
        </Link>
      </div>
    </div>
  );
}
