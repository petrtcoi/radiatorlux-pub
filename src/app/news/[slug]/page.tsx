import { Breadcrumbs, MaxWidthWrapper } from "@/components";
import { Paths } from "@/configs";
import { fetchPosts, stripHtmlTags, wpCategories, wpTags } from "@/shared";
import he from "he";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ============== Generate Static Params ==================

type PageProps = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const { posts } = await fetchPosts({ category: wpCategories.news });
  return posts.map(post => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const postData = await fetchPosts({ category: wpCategories.news, slug: params.slug });
  if (!postData) notFound();
  const { posts } = postData;
  if (!posts.length) notFound();
  const post = posts[0];
  return {
    title: `${post.acf.metaTitle} | RadiatorLux.ru`,
    description: post.acf.metaDescription,
  };
}

// ============== Constants ===============================

const breadcrumbs = [
  {
    title: "Главная",
    url: Paths.home,
  },
  {
    title: "Новости",
    url: Paths.news,
  },
];

export default async function SingleNewsPage(props: PageProps) {
  const postData = await fetchPosts({ category: wpCategories.news, slug: props.params.slug });
  if (!postData) notFound();
  const { posts } = postData;
  if (!posts.length) notFound();
  const post = posts[0];

  const rawHTML = post.content.rendered;
  const titleString = stripHtmlTags(he.decode(post.title.rendered));
  const dateStr = post.date.split("T")[0];

  return (
    <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} linkLast={true} />

      <div className="mt-8 max-w-[52rem] m-auto">
        <h1 className="mt-6 text-3xl text-left font-bold tracking-tight text-sate-900 sm:text-4xl">
          {titleString}
        </h1>
        <div className="mt-2 text-sm text-muted-foreground">{dateStr}</div>

        <div className="mt-2 text-xs text-slate-600 flex flex-row gap-4 ">
          {post.tags
            .map((tag: any) => {
              const _post = Object.values(wpTags).find(t => t.code === String(tag));
              return _post?.title;
            })
            .filter(Boolean)
            .map(title => (
              <div
                key={title}
                className="text-xs py-[2px] px-[6px] border-[1px] bg-slate-50 rounded-sm border-slate-200"
              >
                {title}
              </div>
            ))}
        </div>

        <div
          className="prose-sm pt-6 pb-16 prose-ul:list-disc prose-ol:list-decimal prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: rawHTML }}
        />
      </div>
    </MaxWidthWrapper>
  );
}
