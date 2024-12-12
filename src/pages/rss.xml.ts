import rss from "@astrojs/rss";
import getPosts from "@utils/getPosts";
import { SITE } from "@config";
import { markdown } from "@astropub/md";

export async function GET() {
  const posts = await getPosts();

  const items = await Promise.all(posts.map(async ({ body, data, id }) => ({
    link: `posts/${id}/`,
    title: data.title,
    author: SITE.author,
    description: data.description,
    pubDate: new Date(data.modified ?? data.published),
    categories: data.tags,
    content: (await markdown(body!)).toString(),
  })));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    items,
  });
}
