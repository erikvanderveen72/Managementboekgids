#!/usr/bin/env node
// Zet een ISBN in de frontmatter van een boekpagina.
// Gebruik:  npm run set-isbn -- <slug> <isbn> [slug isbn ...]
// Voorbeeld: npm run set-isbn -- goeiegast 9789492595980 the-culture-map 9789047016458

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
if (args.length < 2 || args.length % 2 !== 0) {
  console.error("Gebruik: npm run set-isbn -- <slug> <isbn> [slug isbn ...]");
  process.exit(1);
}

const dir = path.join(process.cwd(), "content", "boeken");

for (let i = 0; i < args.length; i += 2) {
  const slug = args[i];
  const isbn = args[i + 1].replace(/[^0-9Xx]/g, "");
  const file = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(file)) {
    console.error(`Niet gevonden: ${file}`);
    continue;
  }

  let src = fs.readFileSync(file, "utf8");
  const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.error(`Geen frontmatter gevonden in ${slug}.md`);
    continue;
  }
  const fm = fmMatch[1];
  const body = src.slice(fmMatch[0].length);

  let newFm;
  if (/^isbn:/m.test(fm)) {
    newFm = fm.replace(/^isbn:.*$/m, `isbn: "${isbn}"`);
  } else {
    const lines = fm.split("\n");
    const anchor = lines.findIndex((l) => /^(pages|year|publisher):/.test(l));
    const insertAt = anchor >= 0 ? anchor + 1 : lines.length;
    lines.splice(insertAt, 0, `isbn: "${isbn}"`);
    newFm = lines.join("\n");
  }

  fs.writeFileSync(file, `---\n${newFm}\n---${body}`);
  console.log(`✓ ${slug}: ISBN ${isbn} -> cover https://i.mgtbk.nl/boeken/${isbn}-920x960.jpg`);
}
