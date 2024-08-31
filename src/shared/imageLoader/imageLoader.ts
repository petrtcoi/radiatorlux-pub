"use server";

import { CdnUrl } from ".";

export const imageLoader = ({ src, width }: any) => {
  return `${CdnUrl}/${src}?width=${width}`;
};
