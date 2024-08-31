import { Feature } from "@/components";
import { Paths } from "@/configs";
import { ModelDataBySlug } from "@/entities";

type Props = {
  model: ModelDataBySlug;
  lineName: string;
  lineSlug?: string;
  groupSlug?: string;
  brandSlug?: string;
};

export function FeatureBlock(props: Props) {
  const { model, lineName, lineSlug, groupSlug, brandSlug } = props;
  const {
    stats,
    model: { convType },
  } = model;
  const { heights, length, sections, dt70, price } = stats;

  const brandLink = brandSlug ? `${Paths.brands.root}/${brandSlug}` : undefined;
  const lineLink = lineSlug && groupSlug ? `/${groupSlug}/${lineSlug}` : undefined;

  return (
    <div className="font-light flex flex-col justify-start gap-3">
      <Feature itemProp="brand" title={"производитель"} value={model.brand} link={brandLink} />
      <Feature title={"коллекция"} value={lineName} link={lineLink} />

      {convType && <Feature itemProp="width" title={"тип конвекции"} value={convType} />}

      <Feature
        itemProp="height"
        title={"высота"}
        value={
          heights.min === heights.max ? `${heights.max} мм` : `${heights.min} - ${heights.max} мм`
        }
      />

      <Feature
        itemProp="width"
        title={"длина"}
        value={length.min === length.max ? `${length.max} мм` : `${length.min} - ${length.max} мм`}
      />
      {sections && <Feature title={"число секций"} value={`${sections.min} - ${sections.max}`} />}
      <Feature title={"мощность (ΔT 70°)"} value={`${dt70.min} - ${dt70.max} Вт`} />

      <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
        <meta itemProp="priceCurrency" content="RUB" />
        <meta itemProp="lowPrice" content={`${price.min}`} />

        <Feature
          highlighted={true}
          title={"цена от"}
          value={`${price.min.toLocaleString("ru-RU")} руб.`}
          valueStyles="text-red-600 text-sm"
        />
      </div>
    </div>
  );
}
