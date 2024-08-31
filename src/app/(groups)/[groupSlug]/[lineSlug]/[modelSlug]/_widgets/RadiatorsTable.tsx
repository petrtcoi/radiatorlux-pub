"use client";

import { TColor, TConnection, TRadiator } from "@/entities";
import { useCart } from "@/features";
import { calcPrice, cn } from "@/shared";
import { useAtomValue } from "jotai";
import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import { $filterColor, $filterConnection } from "../_store";

type Props = {
  className?: string;
  initRadiators: TRadiator[];
  initColor: TColor;
  initConn: TConnection;
};

export function RadiatorsTable(props: Props) {
  const { initRadiators, initColor, initConn, className = "" } = props;

  const filterColor = useAtomValue($filterColor);
  const filterConn = useAtomValue($filterConnection);

  const { add: addToCart, remove: removeFromCart, getItem: getCartItem } = useCart();

  const firstCol = "pl-4";
  const lastCol = "pr-4";
  const header = "font-light py-2 text-left";
  const rowStyle = "py-4";

  const lgOnly = "hidden xl:table-cell";
  const mdOnly = "hidden lg:table-cell xl:hidden";
  const mdLgOnly = "hidden md:table-cell";
  const smOnly = "lg:hidden";

  const radiators = initRadiators;
  const color = filterColor || initColor;
  const conn = filterConn || initConn;

  return (
    <table className={cn("w-full", className)}>
      <thead>
        <tr className="text-xs text-slate-600 border-b-[1px] border-b-slate-800">
          <th className={cn(firstCol, header, "text-left")} scope="col" style={{ width: "23rem" }}>
            Наименование
          </th>
          <th className={cn(header, mdLgOnly, "text-center")} scope="col" style={{ width: "8rem" }}>
            Цена, руб
          </th>
          <th className={cn(header, "flex justify-center")} scope="col" style={{ width: "10rem" }}>
            <ShoppingCart strokeWidth={2} />
          </th>
          <th className={cn(header, lgOnly, "text-center")} scope="col" style={{ width: "8rem" }}>
            Глубина, мм
          </th>
          <th className={cn(header, lgOnly, "text-center")} scope="col" style={{ width: "6rem" }}>
            Высота, мм
          </th>
          <th className={cn(header, lgOnly, "text-center")} scope="col" style={{ width: "6rem" }}>
            Длина, мм
          </th>
          <th className={cn(header, mdOnly, "text-center")} scope="col" style={{ width: "20rem" }}>
            Габариты, мм
          </th>
          <th
            className={cn(header, lastCol, mdLgOnly, "text-center")}
            scope="col"
            style={{ width: "8rem" }}
          >
            Мощность
            <br />
            (ΔT 70°), Вт
          </th>
        </tr>
      </thead>
      <tbody>
        {radiators.map(row => {
          const cartQnty =
            getCartItem({
              radSlug: row.slug,
              colorSlug: color.slug,
              connSlug: conn.slug,
            })?.qnty || 0;
          const price = calcPrice({
            radiator: row,
            color,
            conn,
          });

          return (
            <tr
              key={row.slug}
              className="text-xs border-b-[1px] border-b-slate-300 hover:bg-slate-100"
            >
              <td className={cn(firstCol, rowStyle)}>
                <div className="flex flex-col gap-1">
                  <div className="font-bold">{row.name}</div>
                  <div className="text-muted-foreground">
                    {color.name}, {conn.name}
                  </div>
                  <div className={smOnly}>
                    {row.width}
                    <span className="mx-[0.15rem] text-[0.6rem] font-light">x</span>
                    {row.height}
                    <span className="mx-[0.15rem] text-[0.6rem] font-light">x</span>
                    {row.length}
                    <span className="ml-[0.15rem] text-[0.6rem] font-light">мм</span>
                    <span className={"md:hidden"}>
                      , {row.dt70}
                      <span className="ml-[0.15rem] text-[0.6rem] font-light">Вт</span>
                    </span>
                  </div>
                </div>
              </td>
              <td className={cn(mdLgOnly, "text-center")}>{price.toLocaleString("ru-RU")}</td>
              <td>
                <div
                  className="flex flex-col justify-center items-center"
                  style={{ width: "10rem" }}
                >
                  <div className={cn("md:hidden pl-4 mb-2 font-light")}>
                    {price.toLocaleString("ru-RU")} руб.
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    {cartQnty > 0 && (
                      <div
                        onClick={() =>
                          removeFromCart({
                            radSlug: row.slug,
                            colorSlug: color.slug,
                            connSlug: conn.slug,
                          })
                        }
                        className="flex flex-row justify-start items-center gap-1 text-primary hover:opacity-70 cursor-pointer"
                      >
                        <CircleMinus />
                      </div>
                    )}
                    {cartQnty > 0 && <div className="text-lg font-mono">{cartQnty}</div>}
                    <div
                      onClick={() =>
                        addToCart({
                          radSlug: row.slug,
                          colorSlug: color.slug,
                          connSlug: conn.slug,
                          title: row.name,
                          colConn: `${color.name}, ${conn.name}`,
                          params: `${row.width}x${row.height}x${row.length} мм, ${row.dt70} Вт`,
                          priceRub: price,
                        })
                      }
                      className="flex flex-row justify-start items-center gap-1 text-primary hover:opacity-70 cursor-pointer"
                    >
                      <CirclePlus />
                    </div>
                  </div>
                </div>
              </td>
              <td className={cn(lgOnly, "text-center")}>{row.width}</td>
              <td className={cn(lgOnly, "text-center")}>{row.height}</td>
              <td className={cn(lgOnly, "text-center")}>{row.length}</td>
              <td className={cn(mdOnly, "text-center")}>
                {row.width} x {row.height} x {row.length}
              </td>
              <td className={cn(lastCol, mdLgOnly, "text-center")}>{row.dt70}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
