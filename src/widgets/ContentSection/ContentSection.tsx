import { Revalidate } from "@/configs";
import { cn, fetchPage, WpPage } from "@/shared";
import { unstable_cache } from "next/cache";

type Props = {
  slug: string;
  className?: string;
};

export async function ContentSection(props: Props) {
  const { slug, className } = props;

  const { page: pageData } = JSON.parse(
    JSON.stringify(
      await unstable_cache(async () => fetchPage({ slug }), ["cache:page", slug], {
        revalidate: Revalidate,
      })(),
    ),
  ) as { page: WpPage | null };

  if (!pageData) throw new Error("Section with slug: " + slug + " not found");

  const rawHTML = pageData.content.rendered;

  return (
    <div
      className={cn("prose-sm leading-normal prose-ul:list-disc prose-ol:list-decimal", className)}
      dangerouslySetInnerHTML={{ __html: rawHTML }}
    />
  );
}
