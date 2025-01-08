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
  const useModifiedDate = modified && modified > published;
  const actualDate = useModifiedDate ? modified : published;

  const date = actualDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = actualDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={`${styles["timestamp-wrapper"]} ${className}`}
      style={{ fontSize: size === "sm" ? "0.875rem" : "1rem" }}
    >
      <CalendarIcon
        style={{
          scale: size === "sm" ? "90%" : "100%",
          marginRight: size === "sm" ? "0.125rem" : "0.25rem",
        }}
        aria-hidden
      />
      {useModifiedDate && <span className={styles["updated-text"]}>Updated:</span>}
      <time dateTime={actualDate.toISOString()}>{date} | {time}</time>
    </div>
  );
}
