/* eslint-disable @next/next/no-img-element */
import { Paths } from "@/configs";
import { GroupSlug, GroupSlugsMap } from "@/entities";
import { CdnUrl, imageLoader } from "@/shared";
import Image from "next/image";
import Link from "next/link";

type Props = {
  groupSlugs: GroupSlug[];
  brandSlug: string;
  brandName: string;
};

export function GroupLinks(props: Props) {
  const { groupSlugs, brandSlug, brandName } = props;

  const isColumns = groupSlugs.includes(GroupSlugsMap.columns);
  const isDesign = groupSlugs.includes(GroupSlugsMap.design);
  const isConvectors = groupSlugs.includes(GroupSlugsMap.convectors);

  return (
    <div className="flex flex-row flex-nowrap gap-4 overflow-x-scroll no-scrollbar">
      {isColumns && (
        <Link href={`${Paths.brands.root}/${brandSlug}/${GroupSlugsMap.columns}`}>
          <div className="relative h-48 w-48 sm:h-64 sm:w-52 border-slate-100 border-[1px] rounded-lg  cursor-pointer group">
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Стальные трубчатые радиаторы {brandName}
              </div>
            </div>
            <img
              loading="eager"
              src={`${CdnUrl}/main/column.jpg`}
              alt={`Стальные трубчатые радиаторы ${brandName}`}
              className="rounded-lg z-0 object-fill h-full "
            />
          </div>
        </Link>
      )}

      {isDesign && (
        <Link href={`${Paths.brands.root}/${brandSlug}/${GroupSlugsMap.design}`}>
          <div className="relative h-48 w-48 sm:h-64 sm:w-52 border-slate-100 border-[1px] rounded-lg cursor-pointer group">
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Дизайн-радиаторы отопления {brandName}
              </div>
            </div>
            <img
              loading="eager"
              src={`${CdnUrl}/main/velar.jpg`}
              alt={`Дизайн-радиаторы отопления ${brandName}`}
              className="rounded-lg z-0 object-fill h-full "
            />
          </div>
        </Link>
      )}

      {isConvectors && (
        <Link href={`${Paths.brands.root}/${brandSlug}/${GroupSlugsMap.convectors}`}>
          <div className="relative h-48 w-48 sm:h-64 sm:w-52 border-slate-100 border-[1px] rounded-lg  cursor-pointer group">
            <div className="z-10 absolute bottom-2 sm:bottom-10 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-2 backdrop-blur-[1px]">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                Внутрипольные конвекторы {brandName}
              </div>
            </div>
            <img
              loading="eager"
              src={`${CdnUrl}/main/conv.jpg`}
              alt={`Внутрипольные конвекторы ${brandName}`}
              className="rounded-lg z-0 object-fill h-full "
            />
          </div>
        </Link>
      )}
    </div>
  );
}
