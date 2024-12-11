import Timestamp from "@components/Timestamp";
import type { CollectionEntry } from "astro:content";

interface Props {
  id: string,
  frontmatter: CollectionEntry<"blog">["data"],
  secHeading?: boolean,
}

export default function Card({ id, frontmatter, secHeading }: Props) {
  const { title, published, modified, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: id },
    className: "text-lg font-medium decoration-wavy hover:underline",
  };

  return <li className="my-6">
    <a
      href={`/posts/${id}/`}
      className="inline-block text-lg font-medium text-skin-accent decoration-wavy underline-offset-4 focus-visible:no-underline"
    >{
      secHeading
        ? <h2 {...headerProps}>{title}</h2>
        : <h3 {...headerProps}>{title}</h3>
    }</a>
    <Timestamp published={published} modified={modified}/>
    <p>{description}</p>
  </li>;
}
