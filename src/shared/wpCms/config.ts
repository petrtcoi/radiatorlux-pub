export const wpBaseUrlPosts = "http://cmsradiatorlux.ru/wp-json/wp/v2/posts";
export const wpBaseUrlPages = "http://cmsradiatorlux.ru/wp-json/wp/v2/pages";

export const wpTags: Record<string, { code: string; title: string }> = {
  rifar: { code: "6", title: "Rifar" },
  velar: { code: "7", title: "Velar" },
  kzto: { code: "12", title: "КЗТО" },
  warmmet: { code: "13", title: "Warmmet" },

  design: { code: "9", title: "Дизайн-радиаторы" },
  columns: { code: "10", title: "Трубчатые радиаторы" },
  convectors: { code: "11", title: "Внутрипольные конвекторы" },
};

export const wpCategories = {
  news: "5",
  articles: "8",
};

export type WpPost = {
  id: number;
  date: string; // ISO 8601 format
  date_gmt: string; // ISO 8601 format
  guid: {
    rendered: string;
  };
  modified: string; // ISO 8601 format
  modified_gmt: string; // ISO 8601 format
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  acf: {
    metaTitle: string;
    metaDescription: string;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    about: {
      href: string;
    }[];
    author: {
      embeddable: boolean;
      href: string;
    }[];
    replies: {
      embeddable: boolean;
      href: string;
    }[];
    "wp:featuredmedia": {
      embeddable: boolean;
      href: string;
    }[];
    "version-history": {
      count: number;
      href: string;
    }[];
    "predecessor-version": {
      id: number;
      href: string;
    }[];
    "wp:attachment": {
      href: string;
    }[];
    "wp:term": {
      taxonomy: string;
      embeddable: boolean;
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
};

export type WpMedia = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: {
    _acf_changed: boolean;
  };
  class_list: string[];
  acf: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: {
        file: string;
        width: number;
        height: number;
        filesize: number;
        mime_type: string;
        source_url: string;
      };
      thumbnail: {
        file: string;
        width: number;
        height: number;
        filesize: number;
        mime_type: string;
        source_url: string;
      };
      medium_large: {
        file: string;
        width: number;
        height: number;
        filesize: number;
        mime_type: string;
        source_url: string;
      };
      full: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: string[];
    };
  };
  post: number;
  source_url: string;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    about: {
      href: string;
    }[];
    author: {
      embeddable: boolean;
      href: string;
    }[];
  };
};

// ------------

type Link = {
  href: string;
  embeddable?: boolean;
  count?: number;
};

type GuidOrTitleOrExcerpt = {
  rendered: string;
  protected?: boolean;
};

type Meta = {
  _acf_changed: boolean;
  footnotes: string;
};

type Links = {
  self: Link[];
  collection: Link[];
  about: Link[];
  author: Link[];
  replies: Link[];
  "version-history": Link[];
  "predecessor-version": Link[];
  "wp:attachment": Link[];
  curies: Link[];
};

export type WpPage = {
  id: number;
  date: string;
  date_gmt: string;
  guid: GuidOrTitleOrExcerpt;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: GuidOrTitleOrExcerpt;
  content: GuidOrTitleOrExcerpt;
  excerpt: GuidOrTitleOrExcerpt;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Meta;
  class_list: string[];
  acf: {
    short?: string;
  };
  _links: Links;
};
