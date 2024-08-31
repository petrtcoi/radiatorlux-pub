import { contacts } from "@/configs";
import type { CartItem } from "@/features";
import type { ConfirmationFormData } from "../types/ConfirmationFormData.type";

type Props = {
  items: CartItem[];
  totalSum: number;
  formData: ConfirmationFormData;
};

const getOrderConfirmationEmailText = ({ formData, items, totalSum }: Props): string => {
  let text = "Спасибо за ваш запрос в нашем магазине\n";

  text += "Мы свяжемся с вами в ближайшее время для уточнения деталей и согласования заказа.";
  text += "\n\n\n";
  text += "ДЕТАЛИ ЗАКАЗА:";
  text += "\n\n";
  if (formData.name.length) text += `Имя:\t ${formData.name}\n`;
  if (formData.city.length) text += `Город:\t ${formData.city}\n`;
  if (formData.phone?.length) text += `Тел:\t\t ${formData.phone}\n`;
  if (formData.email?.length) text += `Email:\t ${formData.email}\n`;
  if (formData.comment?.length) text += `Комментарий: ${formData.comment}\n`;

  if (items.length > 0) text += `\n\nЗАКАЗ:\n\n`;
  items.forEach((item, index) => {
    const title = `${item.title} ${item.colConn}`;

    text += `${index + 1}. ${title} \nцена: ${item.priceRub.toLocaleString()} руб. \nкол-во: ${
      item.qnty
    } шт \nсумма: ${(item.priceRub * item.qnty).toLocaleString()} руб.\n\n`;
  });

  if (items.length > 0) text += `\nИтого: ${totalSum.toLocaleString()} руб.\n\n`;

  text += `С уважением,\nМагазин дизайн-радиаторов RadiatorLux.ru\n${contacts.website}\nтел.: +7 ${contacts.phone495String}\nтел.: +7 ${contacts.phone812String}`;
  text += `\n\n\nСайт: RadiatorLux.ru\n\n`;

  return text;
};

export { getOrderConfirmationEmailText };
