import { Paths } from "@/configs";

export const MenuItems = [
  {
    title: "О нас",
    url: Paths.about,
    description: "О нашем магазине, условия работы",
  },
  {
    title: "Доставка и оплата",
    url: Paths.delivery,
    description: "Условия доставки и оплаты для физических и юридических лиц",
  },
  {
    title: "Статьи",
    url: Paths.journal,
    description: "Статьи и новости о радиаторах отопления",
  },
  {
    title: "Новости",
    url: Paths.news,
    description: "Новости индустрии: акции, события, новинки",
  },
];

export const RadiatorItems = [
  {
    title: "Трубчатые радиаторы",
    url: Paths.group.columns,
    description:
      "Трубчатые радиаторы отопления - наиболее универсальный тип радиаторов из имеющихся на рынке.",
  },
  {
    title: "Дизайн-радиаторы",
    url: Paths.group.design,
    description:
      "Вертикальные и горизонтальные модели профильных дизайн-радиаторов. Разнообразие форм и цветов.",
  },
  {
    title: "Конвекторы",
    url: Paths.group.convectors,
    description: "Встраиваемые в пол конвекторы. Естественная и принудительная конвекция.",
  },
];
