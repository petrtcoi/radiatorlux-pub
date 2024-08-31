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
  const { posts: articles } = await fetchPosts({ category: wpCategories.articles });
  return articles.map(article => ({
    slug: article.slug,
  }));
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const articleData = await fetchPosts({ category: wpCategories.articles, slug: params.slug });
  if (!articleData) notFound();
  const { posts: articles } = articleData;
  if (!articles.length) notFound();
  const article = articles[0];
  return {
    title: `${article.acf.metaTitle} | RadiatorLux.ru`,
    description: article.acf.metaDescription,
  };
}

// ============== Constants ===============================

const breadcrumbs = [
  {
    title: "Главная",
    url: Paths.home,
  },
  {
    title: "Статьи",
    url: Paths.journal,
  },
];

export default async function SingleArticlePage(props: PageProps) {
  const articleData = await fetchPosts({
    category: wpCategories.articles,
    slug: props.params.slug,
  });
  if (!articleData) notFound();
  const { posts: articles } = articleData;
  if (!articles.length) notFound();
  const article = articles[0];

  const rawHTML = article.content.rendered;
  const titleString = stripHtmlTags(he.decode(article.title.rendered));

  return (
    <MaxWidthWrapper className={"pb-20 pt-8 md:pt-24"}>
      <Breadcrumbs breadcrumbs={breadcrumbs} linkLast={true} />

      <div className="mt-8 w-full max-w-[52rem] m-auto ">
        <h1 className="mt-6 text-3xl text-left font-bold tracking-tight text-sate-900 sm:text-4xl max-w-[46rem]">
          {titleString}
        </h1>

        <div className="mt-2 text-xs text-slate-600 flex flex-row gap-4 ">
          {article.tags
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
          className="prose-sm pt-6 pb-16 prose-ul:list-disc prose-ol:list-decimal"
          dangerouslySetInnerHTML={{ __html: rawHTML }}
        />
      </div>
    </MaxWidthWrapper>
  );
}
