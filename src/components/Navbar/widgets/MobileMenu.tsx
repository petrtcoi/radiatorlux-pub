"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contacts, Paths } from "@/configs";
import { CdnUrl } from "@/shared";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MenuItems, RadiatorItems } from "./config";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={v => setIsOpen(v)}>
      <SheetTrigger asChild>
        <Menu color="#0f172a" className="hover:opacity-70 cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="left" className="pt-0">
        <div className="max-h-screen overflow-y-scroll no-scrollbar">
          <SheetHeader className="pt-8">
            <SheetTitle>
              <div className="flex flex-col gap-2 items-center justify-center">
                <Link href={Paths.home} onClick={() => setIsOpen(false)}>
                  <Image
                    loader={({ width, src }) => `${CdnUrl}/${src}?width=${width}`}
                    src="/logo.png"
                    alt="RadiatorLux логотип"
                    width={60}
                    height={36}
                  />
                </Link>

                <Link href={Paths.home} onClick={() => setIsOpen(false)}>
                  RadiatorLux.ru
                </Link>
              </div>
            </SheetTitle>
            <SheetDescription className="leading-tight">
              Магазин дизайнерских радиаторов отопления
            </SheetDescription>
            <div className="pt-1 flex flex-col justify-start align-middle gap-2 text-xs tracking-tight font-semibold">
              <a className="hover:text-primary" href={`tel:${contacts.phone495}`}>
                {contacts.phone495String}
              </a>
              <a className="hover:text-primary" href={`tel:${contacts.phone812}`}>
                {contacts.phone812String}
              </a>
              <a className="hover:text-primary" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </a>
            </div>
          </SheetHeader>
          <div className="mt-6 pt-6 flex flex-col gap-5 justify-start border-t-[1px] border-slate-300">
            {RadiatorItems.map((item, index) => (
              <Link onClick={() => setIsOpen(false)} key={index} href={item.url}>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold tracking-tight">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 pb-24 flex flex-col gap-5 justify-start border-t-[1px] border-slate-300">
            {MenuItems.map((item, index) => (
              <Link onClick={() => setIsOpen(false)} key={index} href={item.url}>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold tracking-tight">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
