import styles from "@styles/modules/Timestamp.module.sass";
import CalendarIcon from "@assets/icons/calendar.svg?react";

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
    <div
      className={`${styles["timestamp-wrapper"]} ${className}`}
      style={{
        fontSize: size === "sm" ? "0.875rem" : "1rem",
      }}
    >
      <CalendarIcon
        style={{
          scale: size === "sm" ? "90%" : "100%",
          marginRight: size === "sm" ? "0.125rem" : "0.25rem",
        }}
        aria-hidden
      />
      {modified && modified > published &&
        <span className={styles["updated-text"]} hidden style={{ display: "inline" }}>Updated:</span>}
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
