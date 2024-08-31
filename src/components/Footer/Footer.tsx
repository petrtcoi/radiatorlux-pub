"use client";

import { Paths } from "@/configs";
import { CdnUrl, cn } from "@/shared";
import Image from "next/image";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { Copyright } from "./Copyright";

// ----------------------------------------------------------------

const titleStyles = "mb-0 text-xs text-white font-semibold tracking-tight";
const descriptionStyles = "mt-0 text-xs text-slate-400 font-light tracking-tight leading-3";
const blockStyles = "cursor-pointer hover:opacity-70 max-w-40";
const columnStyles = "flex flex-col gap-8";
const columnTitleStyles = "mt-10 mb-4 text-white text-lg font-thin tracking-tight";

// ----------------------------------------------------------------

export function Footer() {
  return (
    <div className="pt-6 pb-6 bg-slate-900">
      <MaxWidthWrapper className="px-3 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* КАТЕГОРИИ */}
          <div>
            <div className={columnTitleStyles}>Категории</div>
            <div className={columnStyles}>
              <a href={Paths.group.columns}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Трубчатые радиаторы</div>
                  <div className={descriptionStyles}>
                    2-4 - трубчатые радиаторы высотой до 240 см.
                  </div>
                </div>
              </a>

              <a href={Paths.group.design}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Дизайн-радиаторы</div>
                  <div className={descriptionStyles}>
                    Вертикальные и горизонтальные модели дизайнерских радиаторов отопления.
                  </div>
                </div>
              </a>

              <a href={Paths.group.convectors}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Внутрипольные конвекторы</div>
                  <div className={descriptionStyles}>
                    Встраиваемые в пол конвекторы с естественной и принудительной вентиляцией.
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* БРЕНДЫ */}
          <div>
            <div className={columnTitleStyles}>Бренды</div>
            <div className={columnStyles}>
              <a href={Paths.kzto.root}>
                <div className={blockStyles}>
                  <div className={titleStyles}>КЗТО</div>
                  <div className={descriptionStyles}>Вся линейка отопительного оборудования.</div>
                </div>
              </a>

              <a href={Paths.velar.root}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Velar</div>
                  <div className={descriptionStyles}>
                    Дизайн-радиаторы, трубчатые батареи, конвекторы и ретро-радиаторы из чугуна.
                  </div>
                </div>
              </a>

              <a href={Paths.tubog.root}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Rifar</div>
                  <div className={descriptionStyles}>Трубчатые радиаторы Tubog.</div>
                </div>
              </a>

              <a href={Paths.warmmet.root}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Warmmet</div>
                  <div className={descriptionStyles}>
                    Широкий выбор дизайн-радиаторов отопления.
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* ПОЛЕЗНАЯ ИНФОРМАЦИЯ */}
          <div>
            <div className={columnTitleStyles}>Информация</div>
            <div className={columnStyles}>
              <a href={Paths.about}>
                <div className={blockStyles}>
                  <div className={titleStyles}>О нас</div>
                  <div className={descriptionStyles}>О нашей компании.</div>
                </div>
              </a>

              <a href={Paths.delivery}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Доставка и оплата</div>
                  <div className={descriptionStyles}>
                    Доставка в любой город России. Оплата длы физических и юридических лиц.
                  </div>
                </div>
              </a>

              <a href={Paths.journal}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Журнал</div>
                  <div className={descriptionStyles}>
                    Полезная информация об отопительных приборах.
                  </div>
                </div>
              </a>

              <a href={Paths.news}>
                <div className={blockStyles}>
                  <div className={titleStyles}>Новости</div>
                  <div className={descriptionStyles}>Новости рынка отопления.</div>
                </div>
              </a>
            </div>
          </div>

          {/* ПОЛЕЗНАЯ ИНФОРМАЦИЯ */}
          <div>
            <div className={columnTitleStyles}>Прочее</div>
            <div className={columnStyles}>
              <a href={Paths.agreement}>
                <div className={blockStyles}>
                  <div className={descriptionStyles}>Пользовательское соглашение</div>
                  <div className={descriptionStyles}></div>
                </div>
              </a>

              <a href={Paths.oferta}>
                <div className={blockStyles}>
                  <div className={titleStyles}></div>
                  <div className={descriptionStyles}>Публичная оферта</div>
                </div>
              </a>

              <a href={Paths.privacy}>
                <div className={blockStyles}>
                  <div className={titleStyles}></div>
                  <div className={descriptionStyles}>Политика конфиденциальности</div>
                </div>
              </a>

              <a href={Paths.sitemap}>
                <div className={blockStyles}>
                  <div className={titleStyles}></div>
                  <div className={descriptionStyles}>Карта сайта</div>
                </div>
              </a>

              <a href="https://homekomfort.ru" rel="noopener noreferrer" target="_blank">
                <div className={blockStyles}>
                  <div className={titleStyles}></div>
                  <div className={cn(descriptionStyles, "mb-2")}>Сайт группы онлайн-магазинов</div>
                  <Image
                    loader={({ src, width }) => `${CdnUrl}/${src}?width=${width}`}
                    src={"/homekomfort.png"}
                    width={120}
                    height={22.5}
                    alt="Homekomfort.ru"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <Copyright />
      </MaxWidthWrapper>
    </div>
  );
}
