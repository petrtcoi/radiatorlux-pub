"use client";

import { Paths } from "@/configs";
import { CartWidget } from "@/features";
import { CdnUrl } from "@/shared";
import { SearchBlock } from "@/widgets";
import Image from "next/image";
import Link from "next/link";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { NavMenu } from "./widgets";

export function Navbar() {
  return (
    <div className="mt-4 pt-2 pb-4 border-b-[1px] border-b-slate-200 shadow-lg">
      <MaxWidthWrapper className="flex flex-row items-center justify-between">
        <div className="flex flex-row justify-start items-center">
          <Link href={Paths.home}>
            <Image
              loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
              src="/logo.png"
              alt="RadiatorLux логотип"
              width={100}
              height={60}
              className="hidden md:block mr-12"
            />
          </Link>
          <NavMenu />
        </div>

        <SearchBlock />

        <CartWidget />
      </MaxWidthWrapper>
    </div>
  );
}
