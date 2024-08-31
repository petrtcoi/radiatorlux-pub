"use client";

import { Paths } from "@/configs";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./hooks";

export function CartWidget() {
  const { cart } = useCart();

  const itemsCount = cart.items.reduce((acc, item) => acc + item.qnty, 0);

  if (itemsCount === 0) {
    return <ShoppingCart size={28} opacity={0.4} />;
  }

  return (
    <a href={Paths.order.cart}>
      <div className="z-[200] fixed right-4 border-[1px] border-slate-200 top-20 md:top-8 md:right-8 backdrop-blur-sm bg-white p-2 rounded-xl bg-opacity-40  flex flex-row gap-2 items-center hover:text-primary cursor-pointer">
        <ShoppingCart size={24} />
        <div className="font-semibold text-xl">{itemsCount}</div>
      </div>
    </a>
  );
}
