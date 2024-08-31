import { PageContent } from "@/widgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка и оплата | RadiatorLux.ru | радиаторы и конвекторы",
  description:
    "Магазин RadiatorLux.ru осуществляет доставку трубчатых радиаторов, дизайн-радиаторов и внутрипольных конвекторов по России. Работаем как с физическими, так и с юридическими лицами.",
};

export default async function DeliveryPage() {
  return (
    <PageContent
      slug={"delivery"}
      type="page"
      part="full"
      className="mt-3 mb-10 prose-a:text-primary"
    />
  );
}
