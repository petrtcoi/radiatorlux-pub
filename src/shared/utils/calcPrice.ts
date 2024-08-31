import { TColor, TConnection, TRadiator } from "@/entities";

type Props = {
  radiator: TRadiator;
  color: TColor;
  conn: TConnection;
};

export function calcPrice(props: Props): number {
  const { radiator, color, conn } = props;

  // @ts-ignore
  const base = radiator.priceRub + (radiator[color.priceCode] || 0);

  const colorPrice = base * ((color.priceRate || 1) - 1) + (color.priceConst || 0);
  const connPrice = base * ((conn.priceRate || 1) - 1) + (conn.priceConst || 0);

  const total = Math.round(base + colorPrice + connPrice);

  return total;
}
