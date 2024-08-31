import { Paths } from "@/configs";
import { fetchAllData, Group, Line, Model } from "@/entities";
import { connectToDb, fetchPosts, wpCategories } from "@/shared";
import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL || "https://radiatorlux.ru";

// ======== Static pages =========

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/`,
  },
  {
    url: `${baseUrl}${Paths.agreement}`,
  },
  {
    url: `${baseUrl}${Paths.privacy}`,
  },
  {
    url: `${baseUrl}${Paths.oferta}`,
  },
  {
    url: `${baseUrl}${Paths.about}`,
  },
  {
    url: `${baseUrl}${Paths.delivery}`,
  },
  {
    url: `${baseUrl}${Paths.collections.hight}`,
  },
  {
    url: `${baseUrl}${Paths.collections.medium}`,
  },
  {
    url: `${baseUrl}${Paths.collections.lowHeight}`,
  },
  {
    url: `${baseUrl}${Paths.brands.root}`,
  },
  {
    url: `${baseUrl}${Paths.journal}`,
  },
  {
    url: `${baseUrl}${Paths.news}`,
  },
];

// ======== Brands pages =========

const getBrandsPages = async () => {
  await connectToDb();
  const { brands, lines, groups } = await fetchAllData();

  const brandPages = brands
    .map(brand => {
      const brandLines = lines.filter(l => l.brandSlug === brand.slug);
      const groupSlugs = groups
        .filter(g => brandLines.some(l => l.groupSlug === g.slug))
        .map(g => g.slug);

      return [
        { url: `${baseUrl}${Paths.brands.root}/${brand.slug}` },
        ...groupSlugs.map(groupSlug => ({
          url: `${baseUrl}${Paths.brands.root}/${brand.slug}/${groupSlug}`,
        })),
      ];
    })
    .flat();
  return brandPages;
};

// ======== News pages =========

const getNewsPages = async () => {
  const { posts } = await fetchPosts({
    category: wpCategories.news,
  });

  const newsPaths = posts.map(post => ({
    url: `${baseUrl}${Paths.news}/${post.slug}`,
  }));
  return newsPaths;
};

// ======== Articles pages =========

const getArticlesPages = async () => {
  const { posts } = await fetchPosts({
    category: wpCategories.articles,
  });

  const articlesPaths = posts.map(post => ({
    url: `${baseUrl}${Paths.journal}/${post.slug}`,
  }));
  return articlesPaths;
};

// ======== Product pages =========

const getProductPages = async () => {
  await connectToDb();
  const groups = await Group.find();

  let productPages: MetadataRoute.Sitemap = [];
  for (const group of groups) {
    productPages.push({
      url: `${baseUrl}/${group.slug}`,
    });
    const lines = await Line.find({ groupSlug: group.slug }).lean();
    for (const line of lines) {
      productPages.push({
        url: `${baseUrl}/${group.slug}/${line.slug}`,
      });
      const models = await Model.find({ lineSlug: line.slug }).lean();
      for (const model of models) {
        productPages.push({
          url: `${baseUrl}/${group.slug}/${line.slug}/${model.slug}`,
        });
      }
    }
  }
  return productPages;
};

// ======== Sitemap =========

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productPages = await getProductPages();
  const newsPages = await getNewsPages();
  const articlesPages = await getArticlesPages();
  const brandsPages = await getBrandsPages();

  return [...staticPages, ...productPages, ...newsPages, ...articlesPages, ...brandsPages];
}
