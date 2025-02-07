import styles from "@/styles/modules/Card.module.sass"
import Timestamp from "@/components/Timestamp"
import type { EntryInfo } from "@/types"

type Props = Readonly<{
  /** The metadata of the post this card represents. */
  post: EntryInfo<"posts">
  /**
   * Whether to use a level 3 heading for the card title instead of a level 2
   * heading.
   */
  useLevel3Heading?: boolean | undefined
}>

/**
 * A card showing the essential details of a blog post, as well as a link to
 * said post.
 */
export default function Card({ post, useLevel3Heading }: Props) {
  const { id, title, published, modified, description } = post
  const Heading = useLevel3Heading ? "h3" : "h2"

  return <li className={styles.card}>
    <Heading>
      <a href={`/posts/${id}/`}>{title}</a>
    </Heading>
    <Timestamp published={published} modified={modified}/>
    <p>{description}</p>
  </li>
}
