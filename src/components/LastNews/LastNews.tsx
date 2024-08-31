import { Paths } from "@/configs";
import { cn, fetchPosts, stripHtmlTags, wpCategories, wpTags } from "@/shared";
import he from "he";
import Link from "next/link";

// ============= Types ==================

type Props = {
  perPage: number;
  tags: string[];

  h2Title: string;
  text?: string;

  className?: string;
};

// ============= Component =============

export async function LastNews(props: Props) {
  const { perPage, tags, h2Title, text = "", className } = props;

  const postData = await fetchPosts({ category: wpCategories.news, tags, perPage });
  if (!postData) return null;
  const { posts } = postData;
  if (!posts || posts.length === 0) return null;

  return (
    <div className={cn("mt-4 md:mt-8", className)}>
      <h2 className="text-xl font-bold tracking-tight">{h2Title}</h2>
      {text.length > 0 && (
        <div className="mt-1 text-left max-w-[32rem] text-sm text-muted-foreground leading-none">
          {text}
        </div>
      )}

      <div className="mt-6 mx-[-100px] px-[100px]  md:mx-0 md:px-2 m-auto flex flex-row flex-nowrap overflow-x-scroll scroll gap-6 items-stretch border-y-[1px] py-6 border-y-slate-200">
        {posts.map(post => {
          const dateStr = post.date.split("T")[0];
          const url = `${Paths.news}/${post.slug}`;
          const content = stripHtmlTags(he.decode(post.excerpt.rendered)).slice(0, 300);

          return (
            <div
              key={post.id}
              className="flex flex-col flex-grow justify-start p-3 min-w-[16rem] max-w-[18rem] bg-slate-100  rounded-lg border-slate-200 border-[1px] hover:ring-2"
            >
              <Link href={url}>
                <div className="text-slate-700 font-mono text-[10px]">{dateStr}</div>
                <div className="mt-1 text-xs font-semibold text-blue-900 tracking-tight leading-tight">
                  {he.decode(stripHtmlTags(post.title.rendered))}
                </div>
                <div className="mt-2 text-xs text-slate-700 line-clamp-3">{content}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
