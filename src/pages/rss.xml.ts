import rss from "@astrojs/rss";
import { getPostsRaw } from "@utils/getPosts";
import { SITE } from "@config";
import day from "dayjs";

export async function GET() {
  const posts = await getPostsRaw();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    items: posts.map(post => ({
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
