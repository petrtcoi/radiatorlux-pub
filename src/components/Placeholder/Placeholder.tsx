"use client";

import { CdnUrl, cn } from "@/shared";
import Image from "next/image";

type Props = {
  title: string;
  text: string;
  url?: string;
  urlText?: string;
  className?: string;
};

export function Placeholder({ title, text, url, className, urlText }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center m-auto", className)}>
      <Image
        loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
        src="/placeholder.png"
        alt="placeholder"
        width={200}
        height={200}
      />
      <div className="max-w-[30rem] m-auto text-center">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-base text-muted-foreground mt-4">{text}</p>
        {url && (
          <div className="pt-4">
            <a href={url} className="text-primary ">
              {urlText || "перейти"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
