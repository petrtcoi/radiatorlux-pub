import { MaxWidthWrapper } from "@/components";
import { Metadata } from "next";
import { Articles } from "./_widgets/Articles";
import { Collections } from "./_widgets/Collections";
import { Manufacturers } from "./_widgets/Manufacturers";
import { News } from "./_widgets/News";
import { ProductGroups } from "./_widgets/ProductGroups";

export const metadata: Metadata = {
  title: "Магазин дизайн-радиаторов, трубчатых радиаторов и конвекторов | RadiatorLux.ru",
  description:
    "Интернет-магазин дизайн-радиаторов отопления, стальных трубчатых радиаторов и внутрипольных конвекторов. Выгодные цены и официальная гарантия. Быстрая доставка по России.",
};

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24 items-center"}>
        <h1 className="text-3xl text-center m-auto font-bold tracking-tight text-sate-900 sm:text-4xl max-w-[36rem]">
          Большой выбор <span className="text-blue-600">дизайн-радиаторов отопления</span> от
          ведущих производителей.
        </h1>
        <p className="mt-6 m-auto text-muted-foreground max-w-prose">
          Добро пожаловать в интернет-магазин дизайнерских радиаторов отопления от российских
          производителей. Здесь вы найдете подходящие модели для вас. А наши менеджеры помогут вам с
          выбором и ответят на все ваши вопросы.
        </p>

        <ProductGroups />

        <Collections />
      </MaxWidthWrapper>

      <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24 items-center"}>
        <Articles />
        <Manufacturers />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mt-00 py-14 w-full max-w-none bg-slate-100 ">
        <News />
      </MaxWidthWrapper>
    </>
  );
}
