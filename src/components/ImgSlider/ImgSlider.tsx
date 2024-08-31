"use client";

import { CdnUrl, cn } from "@/shared";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  images: {
    src: string;
    alt: string;
  }[];
};

export function ImgSlider(props: Props) {
  const { images } = props;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-slate-300";

  const hideButtons = images.length < 2;

  return (
    <div className="group relative aspect-square bg-slate-100 overflow-hidden rounded-xl">
      {!hideButtons && (
        <div className="absolute inset-2 opacity-0 group-hover:opacity-100 transition">
          {/* Prev */}
          <button
            onClick={e => {
              e.preventDefault();
              swiper?.slidePrev();
            }}
            className={cn(activeStyles, "left-0 transition")}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          {/* Next */}
          <button
            onClick={e => {
              e.preventDefault();
              swiper?.slideNext();
            }}
            className={cn(activeStyles, "right-0 transition")}
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      )}
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        loop={true}
        onSwiper={setSwiper}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="w-full h-full"
        lazyPreloadPrevNext={1}
        allowTouchMove={true}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="-z-10 h-full w-full relative">
            <Image
              loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
              fill
              quality={100}
              loading={i === 0 ? "eager" : "lazy"}
              src={img.src}
              alt={img.alt}
              className="-z-10 h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
