/* eslint-disable @next/next/no-img-element */
import { ModelListCard } from "@/components";
import { Paths } from "@/configs";
import { fetchAllData, getBestsellersByBrandSlug, TModel } from "@/entities";
import { CdnUrl, connectToDb } from "@/shared";

/** ====================================
 * Constants / styles
======================================== */

const catLinkStyles = "text-red-600 hover:text-red-700";

/** ====================================
* Render
======================================== */

export async function Manufacturers() {
  await connectToDb();
  const { brands, lines } = await fetchAllData();

  const rifarBestsellers = JSON.parse(
    JSON.stringify(await getBestsellersByBrandSlug({ slug: "rifar" })),
  ) as TModel[];
  const kztoBestsellers = JSON.parse(
    JSON.stringify(await getBestsellersByBrandSlug({ slug: "kzto" })),
  ) as TModel[];
  const velarBestsellers = JSON.parse(
    JSON.stringify(await getBestsellersByBrandSlug({ slug: "velar" })),
  ) as TModel[];
  const warmmetBestsellers = JSON.parse(
    JSON.stringify(await getBestsellersByBrandSlug({ slug: "warmmet" })),
  ) as TModel[];

  return (
    <section className="mt-16 pt-16 m-auto w-full border-t-[2px] border-slate-100">
      <h2 className="text-xl font-semibold text-center tracking-tight">Производители</h2>

      {/* КЗТО */}

      <div className="mt-10 flex flex-col  gap-3 w-full">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-row gap-5 items-center">
            <img src={`${CdnUrl}/main/kzto-logo.png`} width={75} height={48} alt="КЗТО" />
            <h3 className="text-5xl font-bold">KZTO</h3>
          </div>

          <div className="text-sm leading-relaxed max-w-[50rem] m-auto">
            Компания KZTO является одним из лидеров российского рынка теплового оборудования,
            успешно работающая более 20 лет. Ассортимент включает дизайн-радиаторы, стальные
            трубчатые радиаторы, внутрипольные и напольные конвекторы, а также полотенцесушители.
            Компания уделяет внимание не только функциональности, но и внешнему виду своих изделий,
            предлагая широкий выбор по типоразмеру, дизайну и цвету. Отопительные приборы KZTO
            устанавливаются в крупнейших медицинских учреждениях, бизнес-центрах, жилых комплексах и
            отелях по всей России и за её пределами. Надежность и стильный дизайн в сочетании с
            доступной ценой делают продукцию востребованной среди клиентов и партнёров.
            <ul className="mt-1 list-disc pl-4">
              <li>
                <a href={Paths.kzto.root} className={catLinkStyles}>
                  Страница бренда
                </a>
              </li>
              <li>
                <a href={Paths.kzto.columns} className={catLinkStyles}>
                  Трубчатые радиаторы КЗТО
                </a>
              </li>
              <li>
                <a href={Paths.kzto.design} className={catLinkStyles}>
                  Дизайн-радиаторы КЗТО
                </a>
              </li>
              <li>
                <a href={Paths.kzto.convectors} className={catLinkStyles}>
                  Внутрипольные конвекторы КЗТО
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h4 className="mt-4 text-xl font-semibold text-center">
          Популярные модели радиаторов КЗТО
        </h4>
        <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {kztoBestsellers.map(model => {
            const line = lines.find(l => l.slug === model.lineSlug);
            if (!line) return null;
            const brand = brands.find(b => b.slug === line?.brandSlug);
            if (!brand) return null;
            return (
              <div key={model.slug} className="max-w-[12rem]">
                <ModelListCard model={model} brand={brand} line={line} />
              </div>
            );
          })}
        </div>
      </div>

      {/* VELAR */}

      <div className="mt-32 flex flex-col  gap-3 w-full">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-row gap-5 items-center">
            <img src={`${CdnUrl}/main/velar-logo.png`} width={48} height={48} alt="VELAR" />
            <h3 className="text-5xl font-bold">VELAR</h3>
          </div>

          <div className="text-sm leading-relaxed max-w-[50rem] m-auto">
            Компания Velar - российский производитель отопительного оборудования из
            Санкт-Петербурга, успешно работающий с 2015 года. Velar выпускает стальные трубчатые
            радиаторы, внутрипольные конвекторы, чугунные радиаторы и полотенцесушители. Собственное
            производство оснащено современным оборудованием, что позволяет выпускать продукцию
            высокого качества, прошедшую сертификацию и испытания. Velar использует высокопрочную
            сталь толщиной до 3 мм, предлагая различные варианты подключения и окраски по RAL.
            Компания предоставляет гарантию от 5 лет. Продукция Velar отличается высоким качеством,
            надежностью и стильным дизайном, подходящим для различных интерьеров.
            <ul className="mt-1 list-disc pl-4">
              <li>
                <a href={Paths.velar.root} className={catLinkStyles}>
                  Страница производителя Velar
                </a>
              </li>
              <li>
                <a href={Paths.velar.columns} className={catLinkStyles}>
                  Трубчатые радиаторы Velar
                </a>
              </li>
              <li>
                <a href={Paths.velar.design} className={catLinkStyles}>
                  Дизайн-радиаторы Velar
                </a>
              </li>
              <li>
                <a href={Paths.velar.convectors} className={catLinkStyles}>
                  Внутрипольные конвекторы Velar
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h4 className="mt-4 text-xl font-semibold text-center">
          Популярные модели радиаторов Velar
        </h4>
        <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {velarBestsellers.map(model => {
            const line = lines.find(l => l.slug === model.lineSlug);
            if (!line) return null;
            const brand = brands.find(b => b.slug === line?.brandSlug);
            if (!brand) return null;
            return (
              <div key={model.slug} className="max-w-[12rem]">
                <ModelListCard model={model} brand={brand} line={line} />
              </div>
            );
          })}
        </div>
      </div>

      {/* RIFAR */}

      <div className="mt-32 flex flex-col  gap-3 w-full">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-row gap-5 items-center">
            <img src={`${CdnUrl}/main/tubog-logo.png`} width={102} height={48} alt="TUBOG" />
            <h3 className="text-5xl font-bold">Rifar Tubog</h3>
          </div>

          <div className="text-sm leading-relaxed max-w-[50rem] m-auto">
            Продукцию RIFAR на российском рынке знают уже 20 лет благодаря литым секционным
            алюминиевым и биметаллическим радиаторам. В 2022 году линейка продуктов RIFAR
            расширилась за счёт стальных трубчатых радиаторов TUBOG, произведенных из стали CORREX,
            разработанной совместно с ПАО «Северсталь». Стенки радиаторов TUBOG толщиной 1,6 мм в
            два раза превышают требования по EN442-1. Радиаторы соединены лазерной сваркой и
            проверяются рентгеном. Рабочее давление – 16 атм, испытательное – 24 атм, давление
            разрушения – 80 атм. Доступны модели с двумя или тремя колонками, разной высоты, включая
            исполнение MEDICAL для медицинских учреждений и горизонтальные модели TUBOG HORIZONT.
            Все радиаторы имеют симметричное подключение и могут быть окрашены в более чем 6000
            оттенков по каталогу RAL. Гарантия – 10 лет, срок службы – до 25 лет.
            <ul className="mt-1 list-disc pl-4">
              <li>
                <a href={Paths.tubog.root} className={catLinkStyles}>
                  Страница бренда
                </a>
              </li>
              <li>
                <a href={Paths.tubog.columns} className={catLinkStyles}>
                  Трубчатые радиаторы Rifar Tubog
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h4 className="mt-4 text-xl font-semibold text-center">
          Популярные модели радиаторов Rifar Tubog
        </h4>
        <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {rifarBestsellers.map(model => {
            const line = lines.find(l => l.slug === model.lineSlug);
            if (!line) return null;
            const brand = brands.find(b => b.slug === line?.brandSlug);
            if (!brand) return null;
            return (
              <div key={model.slug} className="max-w-[12rem]">
                <ModelListCard model={model} brand={brand} line={line} />
              </div>
            );
          })}
        </div>
      </div>

      {/* WARMMET */}

      <div className="mt-32 flex flex-col  gap-3 w-full">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="flex flex-row gap-5 items-center">
            <img src={`${CdnUrl}/main/warmmet-logo.png`} width={200} height={35} alt="Warmmet" />
            {/* <h3 className='text-5xl font-bold'>WARMMET</h3> */}
          </div>

          <div className="text-sm leading-relaxed max-w-[50rem] m-auto">
            Радиаторы Warmmet адаптируются к любому интерьеру, будь то детская комната, офис, дом
            или квартира. Возможность покраски в любой цвет по шкале RAL позволяет идеально вписать
            радиатор в ваше пространство и повысить стоимость жилья при перепродаже. Собственное
            производство и использование лучших материалов обеспечивают высокое качество продукции.
            Радиаторы отличаются чёткими углами, правильной геометрией и равномерной покраской.
            Краска сертифицирована для использования в детских и медицинских учреждениях. Металл от
            СеверСтали обеспечивает высокую теплоотдачу и долговечность. Пожизненная гарантия
            подтверждает доверие производителя к качеству своей продукции.
            <ul className="mt-1 list-disc pl-4">
              <li>
                <a href={Paths.warmmet.root} className={catLinkStyles}>
                  Страница бренда
                </a>
              </li>
              <li>
                <a href={Paths.warmmet.design} className={catLinkStyles}>
                  Дизайн-радиаторы Warmmet
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h4 className="mt-4 text-xl font-semibold text-center">
          Популярные модели дизайн-радиаторов Warmmet
        </h4>
        <div className="mt-8 flex flex-row items-top justify-start gap-10 overflow-clip overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {warmmetBestsellers.map(model => {
            const line = lines.find(l => l.slug === model.lineSlug);
            if (!line) return null;
            const brand = brands.find(b => b.slug === line?.brandSlug);
            if (!brand) return null;
            return (
              <div key={model.slug} className="max-w-[12rem]">
                <ModelListCard model={model} brand={brand} line={line} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
