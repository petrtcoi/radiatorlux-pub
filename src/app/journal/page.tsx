/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs, MaxWidthWrapper } from "@/components";
import { Paths, Revalidate } from "@/configs";
import { fetchMedia, fetchPosts, imageLoader, stripHtmlTags, wpCategories, wpTags } from "@/shared";
import he from "he";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Полезные статьи об отоплении",
  description:
    "Полезная информация о дизайн-радиаторах, стальных трубчатых радиаторов и внутрипольных конвекторах. Советы по выбору и установке отопительного оборудования.",
};

const breadcrumbs = [
  {
    title: "Главная",
    url: Paths.home,
  },
  {
    title: "Статьи",
    url: "",
  },
];

export default async function NewsPage() {
  // Fetch

  const { posts: _articles } = await unstable_cache(
    async () =>
      await fetchPosts({
        category: wpCategories.articles,
      }),
    ["cache:articles"],
    { revalidate: Revalidate },
  )();

  const articles = await Promise.all(
    _articles.map(async article => {
      const { media } = await unstable_cache(
        async () =>
          await fetchMedia({
            url: article._links["wp:featuredmedia"][0].href,
          }),
        [`posts-${article._links["wp:featuredmedia"][0].href}`],
        { revalidate: 60 * 60 * 1 },
      )();

      return { ...article, media };
    }),
  );

  // Render

  return (
    <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="mt-6 text-3xl text-center m-auto font-bold tracking-tight text-sate-900 sm:text-4xl max-w-[36rem]">
        Полезные статьи об отоплении
      </h1>
      <p className="mt-6 text-center m-auto text-muted-foreground max-w-prose">
        Делимся полезной информацией о дизайн-радиаторах, стальных трубчатых радиаторах и
        внутрипольных конвекторах. Советы по выбору и установке отопительного оборудования.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 m-auto">
        {articles.map(article => {
          return (
            <a key={article.id} href={`${Paths.journal}/${article.slug}`}>
              <div className="flex p-3 box-content border-[1px]	border-slate-200 rounded-lg flex-row items-start align-top gap-6 hover:border-[1px] hover:border-slate-400 cursor-pointer">
                <div className="flex-shrink-0 w-24 h-24 relative items-top">
                  <img
                    loading="lazy"
                    src={article.media.source_url}
                    alt={article.title.rendered}
                    className="border-[1px] rounded-lg  object-fill h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {he.decode(article.title.rendered)}
                  </h3>
                  <div className="text-xs text-muted-foreground tracking-tight leading-tight line-clamp-4">
                    {he.decode(stripHtmlTags(article.excerpt.rendered))}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </MaxWidthWrapper>
  );
}
