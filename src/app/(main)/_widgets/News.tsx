import { Paths, Revalidate } from "@/configs";
import { fetchPosts, stripHtmlTags, wpCategories, WpPost } from "@/shared";
import he from "he";
import { unstable_cache } from "next/cache";

/** ====================================
 * Constants
======================================== */

const POSTS_COUNT = 4;

/** ====================================
* Render
======================================== */

export async function News() {
  const { posts } = JSON.parse(
    JSON.stringify(
      await unstable_cache(
        async () =>
          await fetchPosts({
            perPage: POSTS_COUNT,
            category: wpCategories.news,
          }),
        ["main-page-news"],
        { revalidate: Revalidate },
      )(),
    ),
  ) as { posts: WpPost[] };

  //

  return (
    <section className="m-auto max-w-4xl">
      <h2 className="text-xl font-semibold text-center tracking-tight">Последние новости</h2>

      <div className="mt-6  sm:mt-8 grid grid-cols-1 md:grid-cols-2 px-2 sm:px-6 md:px-0 gap-6 md:gap-10 justify-items-start">
        {posts.map(post => {
          const content = stripHtmlTags(post.content.rendered);
          const dateStr = post.date.split("T")[0];
          const url = `${Paths.news}/${post.slug}`;

          return (
            <div
              key={post.id}
              className="m-auto w-full flex-grow flex flex-col bg-white p-4 rounded-md shadow-md h-full cursor-pointer border-slate-400 border-[1px] border-opacity-0 hover:border-opacity-100"
            >
              <a href={url}>
                <div className="text-blue-600 text-xs">{dateStr}</div>
                <div className="mt-1 leading-tight tracking-tight text-sm font-semibold">
                  {he.decode(post.title.rendered)}
                </div>
                <div className="mt-1 text-xs font-light text-slate-900 line-clamp-4">{content}</div>
              </a>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <a
          href={Paths.news}
          className="text-sm underline text-slate-900 hover:text-blue-600 cursor-pointer font-light"
        >
          Все новости
        </a>
      </div>
    </section>
  );
}
