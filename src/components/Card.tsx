import Timestamp from "@components/Timestamp";
import type { CollectionEntry } from "astro:content";

interface Props {
  /** The ID of the post this card represents. */
  id: string,
  /** The frontmatter of the post this card represents. */
  data: CollectionEntry<"blog">["data"],
  /** Whether to use a level 2 heading for the card title instead of a level 3 heading. */
  level2Heading?: boolean,
}

/**
 * A card showing the essential details of a blog post, as well
 * as a link to said post.
 */
export default function Card({ id, data, level2Heading }: Props) {
  const { title, published, modified, description } = data;

  const headerProps = {
    className: "text-lg font-medium decoration-wavy hover:underline",
  };

  return <li className="my-6">
    <a
      href={`/posts/${id}/`}
      className="inline-block text-lg font-medium text-skin-accent decoration-wavy underline-offset-4 focus-visible:no-underline"
    >{
      level2Heading
        ? <h2 {...headerProps}>{title}</h2>
        : <h3 {...headerProps}>{title}</h3>
    }</a>
    <Timestamp published={published} modified={modified}/>
    <p>{description}</p>
  </li>;
}
