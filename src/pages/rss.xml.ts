import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ site }) => {
  const blogPosts = await getCollection("blog");

  const sortedPosts = blogPosts.sort((a, b) => {
    const aDate = new Date(a.data.pubDate);
    const bDate = new Date(b.data.pubDate);
    return aDate > bDate ? -1 : 1;
  });

  return rss({
    title: "Marioph • Blog",
    description: "Sometimes I write about stuff I find interesting.",
    site: site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    stylesheet: "/rss/styles.xsl"
  });
}
