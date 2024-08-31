import { TColor } from "@/entities";
import { cn, imageLoader } from "@/shared";
import Image from "next/image";

type ColorOptionProps = {
  assetsPath: string;
  active?: boolean;
  setColor: (color: TColor) => void;
  color: TColor;
};

export function ColorOption(props: ColorOptionProps) {
  const { active, setColor, color, assetsPath } = props;
  const { fullName, hex, image, priceConst, priceRate, priceCode } = color;

  return (
    <div
      key={color?.slug}
      onClick={() => {
        setColor(color);
      }}
      className={cn(
        "flex flex-row justify-start p-1 rounded-lg gap-2 items-center flex-grow cursor-pointer hover:opacity-70",
        {
          "ring-4": active,
        },
      )}
    >
      <div
        className={cn(
          "relative  overflow-hidden w-12 h-12 flex flex-shrink-0 justify-start items-center border-[1px] border-slate-300 rounded-lg",
        )}
        style={{
          backgroundColor: !color.image && color.hex ? color.hex : "#FAFAFA",
        }}
      >
        {color.any && (
          <Image
            loader={imageLoader}
            src={`/assets/colors/anycolor2.png`}
            layout="fill"
            objectFit="contain"
            className="p-1"
            alt={fullName}
            sizes="50px"
          />
        )}
        {!color.any && image && (
          <Image
            loader={imageLoader}
            src={`/assets/colors/${assetsPath}/${image}`}
            layout="fill"
            objectFit="cover"
            alt={fullName}
            sizes="50px"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 justify-start tracking-tight leading-3 text-xs">
        <div className="text-left">{fullName}</div>
        {priceRate !== 1 && (
          <div className="text-muted-foreground text-left">коэф.: {priceRate}</div>
        )}
        {priceConst > 0 && (
          <div className="text-muted-foreground text-left">+ {priceConst} руб.</div>
        )}
        {!(priceConst > 0 || priceRate !== 1 || priceCode) && (
          <div className="text-muted-foreground text-left">без наценки</div>
        )}
      </div>
    </div>
  );
}
