import styles from "@styles/modules/Timestamp.module.scss";

interface TimestampProps {
  /** The date this post was published. */
  published: Date,
  /**
   * The date this post was last modified, or `null`
   * if it has not yet been modified.
   */
  modified?: Date,
}

interface Props extends TimestampProps {
  /** The timestamp's size. */
  size?: "sm" | "lg",
  /** Classes to apply to this timestamp. */
  className?: string,
}

/** A timestamp for blog posts. */
export default function Timestamp({
  published,
  modified,
  size = "sm",
  className = "",
}: Props) {
  return (
    <div className={`${styles["timestamp-wrapper"]} ${size === "sm" ? "text-sm" : "text-base"} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={size === "sm" ? "scale-90 mr-0.5" : "scale-100 mr-1"}
        aria-hidden
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"/>
      </svg>
      {modified && modified > published && <span className={styles["updated-text"]}>Updated:</span>}
      <FormattedTimestamp
        published={published}
        modified={modified}
      />
    </div>
  );
}

const FormattedTimestamp = ({ published, modified }: TimestampProps) => {
  const actualDate = modified && modified > published ? modified : published;

  const date = actualDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = actualDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return <span>
    <time dateTime={actualDate.toISOString()}>{date}</time>
    <span aria-hidden> | </span>
    <span style={{ textWrap: "nowrap" }}>{time}</span>
  </span>;
};
