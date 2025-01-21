import rss from "@astrojs/rss";
import { allPostsRaw } from "@utils/allPosts";
import { SITE } from "@config";
import day from "dayjs";

export async function GET() {
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    items: allPostsRaw.map(post => ({
      link: `posts/${post.id}/`,
      title: post.data.title,
      author: SITE.author,
      description: post.data.description,
      pubDate: day(post.data.modified ?? post.data.published).toDate(),
      categories: post.data.tags,
      content: post.rendered!.html,
    })),
  });
}
