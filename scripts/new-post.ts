import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import * as R from 'remeda'

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}` as const
}

// first arg is execPath, second arg is path to script file
const [, , title] = process.argv
if (title === undefined) {
  throw new Error('no title argument provided')
}

const fileName = R.toKebabCase(title)
const dirPath = path.join('./src/content/posts/', fileName)

if (fs.existsSync(dirPath)) {
  throw new Error(`directory ${dirPath} already exists`)
}

fs.mkdirSync(dirPath)

const content = `---
title: ${title}
published: ${getDate()}
draft: true
description: ''
image: ''
tags: []
category: ''
---
` as const
fs.writeFileSync(path.join(dirPath, 'index.md'), content)

console.log(`post ${dirPath} created`)
