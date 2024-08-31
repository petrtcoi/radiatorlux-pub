"use server";

import { contacts } from "@/configs";
import type { CartItem } from "../cart";
import { API_URL } from "./config/apiUrl";
import type { ConfirmationFormData } from "./types/ConfirmationFormData.type";
import { getOrderConfirmationEmailHtml } from "./utils/getOrderConfirmationEmailHtml";
import { getOrderConfirmationEmailText } from "./utils/getOrderConformationEmailText";

type Props = {
  items: CartItem[];
  formData: ConfirmationFormData;
};

export const sendOrderConfirmation = async ({
  items,
  formData,
}: Props): Promise<"ok" | "error"> => {
  const totalSum = items.reduce((acc, item) => {
    const price = item.priceRub;
    const sum = price * item.qnty;

    return acc + sum;
  }, 0);

  const text = getOrderConfirmationEmailText({ items, totalSum, formData });
  const html = getOrderConfirmationEmailHtml({ items, totalSum, formData });

  const data = {
    to: formData.email,
    from: contacts.emailFrom,
    subject: "RadiatorLux.ru: ваш запрос принят",
    text,
    html,
  };

  try {
    const res1 = formData.email?.length
      ? await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ...data }),
        })
          .then(() => ({ data: "ok" }))
          .catch(() => ({ data: "error" }))
      : { data: "ok" };

    const res2 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...data, to: contacts.emailNotifications }),
    })
      .then(() => ({ data: "ok" }))
      .catch(data => {
        return { data: "error" };
      });

    console.log("RES", res1, res2);

    return res1.data === "ok" && res2.data === "ok" ? "ok" : "error";
  } catch (err) {
    return "error";
  }
};
