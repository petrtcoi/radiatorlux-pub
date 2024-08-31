import { wpBaseUrlPosts, WpPost } from "./config";

type Props = {
  offset?: number;
  category: string;
  slug?: string;
  revalidate?: number | false;
  perPage?: number;
  tags?: string[];
};

type Response = {
  posts: WpPost[];
  count: number | null;
  pages: number | null;
};

export async function fetchPosts(props: Props): Promise<Response> {
  const { category, slug, revalidate = 60 * 60 * 0, perPage = 12, offset = 0, tags = [] } = props;

  const params: Record<string, string> = {
    categories: category,
    "filter[orderby]": "date",
    order: "desc",
    per_page: `${perPage}`,
    offset: `${offset}`,
    slug: slug || "",
  };

  if (tags.length > 0) {
    params.tags = tags.join(",");
  }

  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch(`${wpBaseUrlPosts}?${searchParams}`, {
    next: { revalidate },
  });

  const posts = (await response.json()) as WpPost[];

  const wpTotal = response.headers.get("X-WP-Total");
  const wpTotalPages = response.headers.get("X-WP-TotalPages");

  const count = wpTotal === null ? null : Number(wpTotal);
  const pages = wpTotalPages === null ? null : Number(wpTotalPages);

  return { count, pages, posts };
}
