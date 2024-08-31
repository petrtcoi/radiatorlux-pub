import { Model } from "@/entities";
import { PageContent } from "@/widgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О магазине RadiatorLux.ru | радиаторы и конвекторы",
  description:
    "Магазин RadiatorLux.ru специализируется на продаже дизайн-радиаторов, трубчатых радиаторов и конвекторов отопления. Наша компания работает с 2009 года. Работаем с юридическими и физическими лицами. Доставка по всей России.",
};

export default async function AboutPage() {
  return (
    <PageContent
      slug={"about"}
      type="page"
      part="full"
      className="mt-3 mb-10 prose-a:text-primary"
    />
  );
}
