import styles from "@styles/modules/Card.module.sass";
import Timestamp from "@components/Timestamp";
import type { CollectionEntry } from "astro:content";

interface Props {
  /** The ID of the post this card represents. */
  id: string,
  /** The frontmatter of the post this card represents. */
  data: CollectionEntry<"blog">["data"],
  /** Whether to use a level 3 heading for the card title instead of a level 2 heading. */
  useLevel3Heading?: boolean,
}

/**
 * A card showing the essential details of a blog post, as well
 * as a link to said post.
 */
export default function Card({ id, data, useLevel3Heading }: Props) {
  const { title, published, modified, description } = data;
  const Heading = useLevel3Heading ? "h3" : "h2";

  return <li className={styles["card"]}>
    <Heading>
      <a href={`/posts/${id}/`}>{title}</a>
    </Heading>
    <Timestamp published={published} modified={modified}/>
    <p>{description}</p>
  </li>;
}
