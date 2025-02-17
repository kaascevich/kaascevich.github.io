/* This is a script to create a new post markdown file with front-matter */

import fs from "node:fs"
import path from "node:path"
import slugify from "slugify"

function getDate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

// first arg is execPath, second arg is path to script file
const [, , title] = process.argv
if (title === undefined) {
  console.error(
    "error: no title argument provided\nusage: pnpm run new-post <title>",
  )
  process.exit(1)
}

const fileName = slugify(title, { lower: true, strict: true })
const dirPath = path.join("./src/content/posts/", fileName)

if (fs.existsSync(dirPath)) {
  console.error(`error: directory ${dirPath} already exists`)
  process.exit(1)
}

fs.mkdirSync(dirPath)

const content = `---
title: ${title}
published: ${getDate()}
draft: true
description: ""
image: ""
tags: []
category: ""
---
`
fs.writeFileSync(path.join(dirPath, "index.md"), content)

console.log(`post ${dirPath} created`)
