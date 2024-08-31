import { Revalidate } from "@/configs";
import { cn, fetchPage, WpPage } from "@/shared";
import { unstable_cache } from "next/cache";

type Props = {
  part: "short" | "full";
  type: "group" | "line" | "model" | "brand" | "collection" | "page";
  slug: string;
  className?: string;
  classNameLink?: string;
  h2Header?: string;
  shortDesc?: string;
  revalidate?: number;
};

export async function PageContent(props: Props) {
  const {
    slug,
    part,
    type,
    className,
    classNameLink,
    h2Header,
    shortDesc,
    revalidate = Revalidate,
  } = props;

  const pageSlug = `page-content-${type}-${slug}`;

  const textData = await unstable_cache(
    async () => await fetchPage({ slug: pageSlug }),
    ["cache:page-content", pageSlug],
    { revalidate },
  )();

  if (!textData.page)
    return shortDesc ? (
      <div className={cn("text-sm leading-normal text-muted-foreground", className)}>
        {shortDesc}
      </div>
    ) : null;

  const short = textData.page.acf.short;
  const full = textData.page.content.rendered;

  if (part === "short") {
    if (!short) {
      throw new Error("No text or collapsed	text");
    }
    return (
      <div>
        <div
          className={cn(
            "prose-sm leading-normal prose-ul:list-disc prose-ol:list-decimal",
            className,
          )}
          dangerouslySetInnerHTML={{
            __html: short.replace(/\n/g, "").replace(/\t/g, ""),
          }}
        />
        <a
          className={cn(
            "prose-sm text-inherit leading-normal prose-ul:list-disc prose-ol:list-decimal underline hover:text-primary",
            classNameLink,
          )}
          href="#full-content"
        >
          Читать далее
        </a>
      </div>
    );
  }

  if (!full) {
    return null;
  }
  return (
    <section id="full-content" className={cn("mt-10 pt-10 max-w-[50rem] m-auto w-full", className)}>
      {h2Header && (
        <h2 className="font-semibold text-xl flex w-full justify-start tracking-tight">
          {h2Header}
        </h2>
      )}
      <div
        id="full-content"
        className={cn(
          "prose-sm leading-normal prose-ul:list-disc prose-ol:list-decimal prose-a:text-primary prose-h2:tracking-tight prose-h2:font-bold",
          className,
        )}
        dangerouslySetInnerHTML={{
          __html: full.replace(/\n/g, "").replace(/\t/g, ""),
        }}
      />
    </section>
  );
}
