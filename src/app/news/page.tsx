import { Breadcrumbs, MaxWidthWrapper } from "@/components";
import { Paths, Revalidate } from "@/configs";
import { fetchPosts, stripHtmlTags, wpCategories, wpTags } from "@/shared";
import he from "he";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Новости рынка отопительного оборудования",
  description:
    "Новости рынка отопительного оборудования России. Дизайн-радиаторы, стальные трубчатые радиаторы, внутрипольные конвекторы. События, акции, новинки, обзоры и аналитика.",
};

const breadcrumbs = [
  {
    title: "Главная",
    url: Paths.home,
  },
  {
    title: "Новости",
    url: "",
  },
];

export default async function NewsPage() {
  const { posts } = await unstable_cache(
    async () =>
      await fetchPosts({
        category: wpCategories.news,
      }),
    ["cache:news"],
    { revalidate: Revalidate },
  )();

  return (
    <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="mt-6 text-3xl text-center m-auto font-bold tracking-tight text-sate-900 sm:text-4xl max-w-[36rem]">
        Новости рынка отопительного оборудования
      </h1>
      <p className="mt-6 text-center m-auto text-muted-foreground max-w-prose">
        Актуальные новости рынка отопительного оборудования России. События, акции, новинки, обзоры
        и аналитика.
      </p>

      <div className="mt-10 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(post => {
          const dateStr = post.date.split("T")[0];
          const url = `${Paths.news}/${post.slug}`;

          return (
            <div
              key={post.id}
              className="m-auto mb-2 w-full flex-grow flex flex-col bg-white p-2 rounded-md h-full cursor-pointer border-slate-400 border-[1px] border-opacity-0 hover:border-opacity-100"
            >
              <Link href={url}>
                <div className="text-slate-700 font-mono text-xs">{dateStr}</div>
                <div className="leading-tight tracking-tight text-sm font-semibold">
                  {he.decode(post.title.rendered)}
                </div>
                <div className="mt-1 text-xs">
                  {post.tags
                    .map((tag: any) => {
                      const _post = Object.values(wpTags).find(t => t.code === String(tag));
                      return _post?.title;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-3">
                  {he.decode(stripHtmlTags(post.excerpt.rendered)).slice(0, 500)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </MaxWidthWrapper>
  );
}
