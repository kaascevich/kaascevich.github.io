import styles from "@/styles/modules/Timestamp.module.sass"
import CalendarIcon from "@/assets/icons/calendar.svg?react"
import type { DateTime } from "@/types"

import day from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import timezone from "dayjs/plugin/timezone"
day.extend(advancedFormat)
day.extend(timezone)

interface Props {
  /** The date this post was published. */
  published: DateTime
  /** The date this post was last modified. */
  modified?: DateTime | undefined
}

/** A timestamp for blog posts. */
export default function Timestamp({ published, modified }: Props) {
  const useModifiedDate = modified && modified > published
  const date = day(useModifiedDate ? modified : published)

  const dateTimeString = date.format("MMM D, YYYY [at] h:mm a (z)")

  return (
    <div className={`${styles["timestamp"]} timestamp`}>
      <CalendarIcon aria-hidden={true}/>
      {useModifiedDate &&
        <span className={styles["updated-text"]}>Updated:</span>
      }
      <time dateTime={date.toISOString()}>{dateTimeString}</time>
    </div>
  )
}
