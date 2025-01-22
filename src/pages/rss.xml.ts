import rss from "@astrojs/rss";
import allPosts from "@/utils/allPosts";
import { SITE } from "@/config";
import day from "dayjs";
import { getEntry } from "astro:content";

export async function GET() {
  const renderedPosts = await Promise.all(allPosts.map(async post => {
    const rawPost = await getEntry("posts", post.id)!;
    return { ...post, rendered: rawPost.rendered }
  }));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    items: renderedPosts.map(post => ({
      link: `posts/${post.id}/`,
      title: post.title,
      author: SITE.author,
      description: post.description,
      pubDate: day(post.modified ?? post.published).toDate(),
      categories: post.tags,
      content: post.rendered!.html,
    })),
  });
}
