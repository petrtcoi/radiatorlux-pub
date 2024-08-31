/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs, ImgSlider, MaxWidthWrapper } from "@/components";
import { ContentSection, PageContent } from "@/widgets";

import { Paths, Revalidate, WpSectionsSlugs } from "@/configs";
import {
  Color,
  Connection,
  fetchAllData,
  genFetchModelBySlugPromise,
  Line,
  Model,
  Radiator,
  TColor,
  TConnection,
  TLine,
  TModel,
  TRadiator,
} from "@/entities";
import { connectToDb } from "@/shared";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import {
  FeatureBlock,
  LogoAndTitleDesktop,
  ModelFilters,
  RadiatorsTable,
  SeeAlsoModels,
} from "./_widgets";

// ==========  Types / Paths ====================

type PageProps = {
  params: {
    modelSlug: string;
    groupSlug: string;
    lineSlug: string;
  };
};

// export const generateStaticParams = async () => {
//   await connectToDb();
//   const models = await Model.find().lean();
//   const lines = await Line.find().lean();

//   return models.map(model => {
//     const line = lines.find(l => l.slug === model.lineSlug);
//     if (!line) {
//       throw Error(`Line not found: ${model.lineSlug} - ${model.slug}`);
//     }

//     return {
//       groupSlug: line.groupSlug,
//       lineSlug: line.slug,
//       modelSlug: model.slug,
//     };
//   });
// };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // read route params
  const { lineSlug, modelSlug } = params;
  await connectToDb();
  const line = (await unstable_cache(
    async () => await Line.findOne({ slug: lineSlug }).lean(),
    ["cache:line", lineSlug],
    {
      revalidate: Revalidate,
    },
  )()) as TLine;

  const model = (await unstable_cache(
    async () => await Model.findOne({ slug: modelSlug }).lean(),
    ["cache:model", modelSlug],
    {
      revalidate: Revalidate,
    },
  )()) as TModel;

  return {
    title: `${model.fullName} | Купить `,
    description: `Приобрести модель ${line.name} по выгодной цене с официальной гарантией. Доставим в любой город России. Помощь в подборе и расчете требуемой мощности. `,
  };
}

// =========  Component  =============

export default async function ModelPage(props: PageProps) {
  const { params } = props;

  await connectToDb();

  // Fetch data
  const { lines, groups, brands } = await fetchAllData();
  const line = lines.find(l => l.slug === params.lineSlug);
  const group = groups.find(g => g.slug === params.groupSlug);
  const brand = brands.find(b => b.slug === line?.brandSlug);
  if (!line || !group || !brand) {
    notFound();
  }

  // Fetch Model's data
  const modelData = await genFetchModelBySlugPromise({
    slug: params.modelSlug,
    revalidate: Revalidate,
  });
  if (!modelData || line.groupSlug !== group.slug || modelData.lineSlug !== line.slug) {
    notFound();
  }

  // Fetch Model's radiators
  const initRadiators = (await unstable_cache(
    async () =>
      await Radiator.find({
        modelSlug: params.modelSlug,
      }).lean(),
    ["cache:radiators-by-model-slug", params.modelSlug],
    { revalidate: Revalidate },
  )()) as unknown as TRadiator[];

  if (!initRadiators || initRadiators.length === 0) {
    notFound();
  }

  // Fetch Connections and Colors
  const colors = (await unstable_cache(
    async () =>
      await Color.find({
        group: line.colorsGroup,
      }).lean(),
    ["cache:colors-by-group", line.colorsGroup],
    { revalidate: Revalidate },
  )()) as TColor[];

  if (!colors || colors.length === 0) {
    notFound();
  }
  const initColor = colors.find(c => c.type === "default") || colors[0];

  const connections = (await unstable_cache(
    async () =>
      Connection.find({
        group: line.connectionsGroup,
      }).lean(),
    ["cache:connections-by-group", line.connectionsGroup],
    { revalidate: Revalidate },
  )()) as TConnection[];

  if (!connections || connections.length === 0) {
    notFound();
  }
  const initConnection = connections.find(c => c.type === "default") || connections[0];

  // Prepare data
  const { model } = JSON.parse(JSON.stringify(modelData)) as { model: TModel };
  const images = (model.images || "").split(",").map(img => ({
    alt: model.fullName,
    src: `/assets/models/${model.assetsPath}/${img}`,
  }));

  /** ==============================
  * BreadCrumbs
  ================================== */

  const breadcrumbs = [
    {
      title: "Главная",
      url: Paths.home,
    },
    {
      title: group.name,
      url: `/${group.slug}`,
    },

    {
      title: line.name,
      url: `/${group.slug}/${line.slug}`,
    },
    {
      title: model.name,
      url: "",
    },
  ];

  /** ==============================
  * Render
  ================================== */

  return (
    <MaxWidthWrapper className={"mt-4 md:mt-12 pb-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <section className="mt-4 md:mt-12 flex flex-col md:flex-row justify-start items-start gap-6 md:gap-10 w-full">
        <div className="md:hidden flex flex-col gap-4">
          <h1 className=" flex items-center font-semibold tracking-tight text-sate-900 text-2xl  md:text-2xl">
            {model.fullName}
          </h1>
          <SeeAlsoModels slugsString={model.seeAlsoSlugs} />
        </div>

        <div className="w-full sm:max-w-[30rem] md:max-w-[40%]  lg:max-w-[24rem] flex-shrink-0">
          <ImgSlider images={images} />
        </div>

        <div className="w-full">
          <LogoAndTitleDesktop
            className="mb-2 md:mb-6 "
            modelTitle={model.fullName}
            brandSlug={brand.slug}
            brandLogoSrc={brand.logo}
          />

          <PageContent
            slug={model.slug}
            type={"model"}
            part="short"
            classNameLink="text-xs"
            shortDesc={model.shortDesc || line.shortDesc}
            className="mt-6 text-xs text-muted-foreground"
          />

          <div className="mt-6 max-w-[38rem]">
            <FeatureBlock
              model={modelData}
              lineName={line.name}
              lineSlug={line.slug}
              groupSlug={group.slug}
              brandSlug={brand.slug}
            />
          </div>

          <SeeAlsoModels className="mt-6 hidden md:flex" slugsString={model.seeAlsoSlugs} />
        </div>
      </section>

      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Каталог радиаторов</h2>
        <ModelFilters
          colors={colors}
          connections={connections}
          assetsPathColor={line.colorsGroup}
          assetsPathConnection={line.connectionsGroup}
          initColor={initColor}
          initConnection={initConnection}
        />
        <RadiatorsTable
          className="mt-6"
          initRadiators={initRadiators}
          initColor={initColor}
          initConn={initConnection}
        />
      </div>

      <PageContent
        slug={model.slug}
        type={"model"}
        part={"full"}
        className="mt-3"
        h2Header={`${model.fullName} - описание`}
      />

      <section className="mt-20 max-w-[50rem] m-auto prose-sm prose-h2:font-semibold">
        <h2>
          Как заказать {brand.name} {model.name}
        </h2>
        <ContentSection slug={WpSectionsSlugs.HowToMakeOrderAndDelivery} />
      </section>

      <div className="mt-20" />
    </MaxWidthWrapper>
  );
}
