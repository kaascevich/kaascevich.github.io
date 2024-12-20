import Timestamp from "@components/Timestamp";
import type { CollectionEntry } from "astro:content";
import styles from "@styles/modules/Card.module.scss";

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

  return <li className={styles["card"]}>
    <a href={`/posts/${id}/`} className={styles["card-header-link"]}>{
      level2Heading
        ? <h2 className={styles["card-header"]}>{title}</h2>
        : <h3 className={styles["card-header"]}>{title}</h3>
    }</a>
    <Timestamp published={published} modified={modified}/>
    <p>{description}</p>
  </li>;
}
