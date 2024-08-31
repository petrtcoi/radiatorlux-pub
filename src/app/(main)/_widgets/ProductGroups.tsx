"use client";

import { Paths } from "@/configs";
import { CdnUrl } from "@/shared";
import Image from "next/image";
import Link from "next/link";

export function ProductGroups() {
  return (
    <section className="mt-8 text-left w-full">
      <h2 className="text-xl font-semibold text-center tracking-tight">Категории</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {/* Трубчатые радиаторы */}

        <Link href={Paths.group.columns}>
          <div className="relative w-full h-52 sm:h-64 border-slate-100 border-[1px] rounded-lg p-4 cursor-pointer group ">
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Трубчатые радиаторы отопления
              </div>
            </div>
            <Image
              loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
              loading="eager"
              src="/main/column.jpg"
              style={{ objectFit: "cover" }}
              layout="fill"
              alt="Трубчатые радиаторы отопления"
              quality={100}
              className="rounded-lg absolute z-0"
              sizes={"220px"}
            />
          </div>
        </Link>

        {/* Дизайн-радиаторы */}
        <Link href={Paths.group.design}>
          <div className="relative w-full h-52 sm:h-64 border-slate-100 border-[1px] rounded-lg p-4 cursor-pointer group">
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Дизайн-радиаторы отопления
              </div>
            </div>
            <Image
              loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
              loading="eager"
              src="/main/velar.jpg"
              style={{ objectFit: "cover" }}
              layout="fill"
              alt="Дизайн-радиаторы отопления"
              quality={100}
              className="rounded-lg absolute z-0"
              sizes={"220px"}
            />
          </div>
        </Link>

        {/* Конвекторы  */}

        <div className="relative w-full h-36 sm:h-64 col-span-2 sm:col-span-1  border-slate-100 border-[1px] rounded-lg p-4 cursor-pointer group">
          <Link href={Paths.group.convectors}>
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Внутрипольные конвекторы
              </div>
            </div>
            <Image
              loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
              loading="eager"
              src="/main/conv.jpg"
              style={{ objectFit: "cover" }}
              layout="fill"
              alt="Внутрипольный конвектор отопления"
              quality={100}
              className="rounded-lg absolute z-0"
              sizes={"(max-width: 768px) 280px, 220px"}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
