/* eslint-disable @next/next/no-img-element */
import { Paths, Revalidate } from "@/configs";
import { fetchMedia, fetchPosts, stripHtmlTags, wpCategories, WpPost } from "@/shared";
import he from "he";
import { unstable_cache } from "next/cache";
import Image from "next/image";

/** ====================================
 * Constants
======================================== */

const ARTICLES_COUNT = 5;

/** ====================================
* Render
======================================== */

export async function Articles() {
  //

  const { posts: _articles } = JSON.parse(
    JSON.stringify(
      await unstable_cache(
        async () =>
          await fetchPosts({
            perPage: ARTICLES_COUNT,
            category: wpCategories.articles,
          }),
        [`posts-last`],
        { revalidate: Revalidate },
      )(),
    ),
  ) as { posts: WpPost[] };

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

  const [firstArticle, ...restArticles] = articles;

  return (
    <section className="m-auto  w-full">
      <h2 className="text-xl font-semibold text-center tracking-tight">Полезные статьи</h2>

      <div className="mt-6 flex flex-col md:flex-row gap-9">
        {/* First Article */}
        <div className="w-full md:w-1/2 h-96 relative rounded-xl overflow-hidden group">
          <a href={`${Paths.journal}/${firstArticle.slug}`}>
            <div className="z-10 absolute bottom-2 sm:bottom-4 w-full left-0 bg-slate-900 bg-opacity-50 group-hover:bg-opacity-70 p-3 backdrop-blur-[1px] ">
              <div className="opacity-100 text-slate-100 text-sm sm:text-base">
                <h3 className="text-lg font-semibold tracking-tight leading-tight">
                  {he.decode(firstArticle.title.rendered)}
                </h3>
                <div className="mt-1 line-clamp-6">
                  {stripHtmlTags(he.decode(firstArticle.excerpt.rendered))}
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              src={firstArticle.media.source_url}
              alt={firstArticle.title.rendered || ""}
              className="object-fill h-full w-full"
            />
          </a>
        </div>

        {/* Other Article */}

        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-3">
            {restArticles.map(article => (
              <a key={article.id} href={`${Paths.journal}/${article.slug}`}>
                <div className="flex flex-row items-start align-top gap-6 hover:opacity-75 cursor-pointer">
                  <div className="flex-shrink-0 w-24 h-24 relative items-top">
                    <img
                      loading="lazy"
                      src={article.media.source_url}
                      alt={article.title.rendered}
                      className="border-[1px] rounded-lg object-fill h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold tracking-tight">
                      {he.decode(article.title.rendered)}
                    </h3>
                    <div className="text-xs text-muted-foreground tracking-tight leading-tight line-clamp-3">
                      {he.decode(stripHtmlTags(article.excerpt.rendered))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={Paths.journal}
              className="text-sm underline text-slate-900 hover:text-blue-600 cursor-pointer font-light"
            >
              Все статьи
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
