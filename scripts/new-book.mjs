#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error("Gebruik: npm run new-book -- \"Titel van het boek\"");
  process.exit(1);
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const slug = slugify(title);
const today = new Date().toISOString().slice(0, 10);
const dir = path.join(process.cwd(), "content", "boeken");
fs.mkdirSync(dir, { recursive: true });

const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`Bestaat al: ${file}`);
  process.exit(1);
}

const template = `---
title: "${title.replace(/"/g, '\\"')}"
subtitle: ""
authors:
  - ""
publisher: ""
year: ${new Date().getFullYear()}
pages:
categories:
  - ""
publishedAt: "${today}"
excerpt: ""
coreIdea: ""
forWhom:
  - ""
notForWhom:
  - ""
strongPoints:
  - ""
weakPoints:
  - ""
similarBooks:
  - ""
scores:
  practicalValue: 0
  readability: 0
  originality: 0
  beginnerFriendly: 0
lessons:
  - title: ""
    description: ""
affiliate:
  managementboek: ""
---

## Waar gaat dit boek over?

## Praktische toepassing

### Voor managers

### Voor ondernemers

### Voor teams en professionals

## Sterke punten

## Zwakke punten

## Mijn oordeel
`;

fs.writeFileSync(file, template);
console.log(`Aangemaakt: ${path.relative(process.cwd(), file)}`);
