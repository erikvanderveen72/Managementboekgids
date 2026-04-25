# CLAUDE.md — Projectgeheugen voor Managementboekgids

Lees dit bestand bij het begin van een nieuwe chat. Het vat de status, conventies en workflows samen zodat je niet door de hele chathistorie hoeft.

## Wat is dit project?

**Managementboekgids.nl** — een Nederlandstalige site die de beste managementboeken bespreekt en vertaalt naar praktische lessen. Doelgroep: managers, ondernemers, professionals. Verdienmodel: affiliate links (Managementboek.nl). Eigenaar: Erik van der Veen.

**Ambitie:** dagelijks een nieuwe boekbespreking publiceren, op termijn 100+ boeken.

## Stack en deploy

- **Next.js 16** (App Router, server components, static generation)
- **TypeScript** strict
- **Tailwind CSS** + `@tailwindcss/typography`
- **Markdown + frontmatter** voor alle content (gray-matter, remark, remark-gfm, remark-html)
- **Vercel** auto-deploy bij push naar `main`
- **Domein**: managementboekgids.nl (Vercel-hosted)

**Branches:**
- `main` → production (Vercel deployt automatisch)
- `claude/review-project-setup-smbxU` → ontwikkelbranch, wordt synchroon gehouden met main
- Alle commits gaan naar **beide** branches: `git push origin claude/review-project-setup-smbxU && git push origin claude/review-project-setup-smbxU:main`

## Folderstructuur

```
app/
  page.tsx                     Homepage met featured boek + recente besprekingen
  layout.tsx                   Root layout met header/footer
  boeken/
    page.tsx                   Overzicht alle boeken
    [slug]/page.tsx            Detail-pagina van een boek
  categorie/
    [slug]/page.tsx            Categoriepagina (met content uit content/categories/)
  categorieen/page.tsx         Lijst van alle categorieën
  over/page.tsx                Over deze site
  affiliate/page.tsx           Affiliate disclosure
  sitemap.ts, robots.ts        SEO

components/
  SiteHeader.tsx               Top nav (responsive met flex-wrap)
  SiteFooter.tsx
  BookCard.tsx                 Card op overzicht/homepage
  BookCover.tsx                Client component, faalt gracieus bij broken image
  AffiliateButton.tsx          Full-width default, fullWidth=false override
  ScoreBar.tsx                 Beoordelings-balkjes

lib/
  books.ts                     getAllBooks, getBook, getCategoryName etc.
  categories.ts                getCategoryContent (markdown per categorie)
  types.ts                     BookMeta, Book, BookScores etc.

content/
  boeken/<slug>.md             Frontmatter + body per boek (39 stuks live)
  categories/<slug>.md         Intro-content per categorie (12 stuks)

public/
  covers/                      Optionele lokale covers (meestal niet nodig, mgtbk CDN)
  infographics/                Boek-infographics (per ISBN of slug)

scripts/
  new-book.mjs                 Nieuwe boekpagina aanmaken
  set-isbn.mjs                 ISBN bulk toevoegen, cover wordt auto afgeleid
```

## Belangrijke conventies

### Schrijfstijl

- **Toon:** professioneel, helder, eerlijk. Niet markeerterig.
- **Geen em-dashes** (`—`). Vervangen door komma of dubbele punt. Globaal verwijderd op 2026-04-25.
- **Eigen analyse boven samenvatting** — verhouding ±25% samenvatting, ±30% toepassing, ±20% kritiek, ±15% vergelijking, ±10% koopadvies.
- Geen volledige hoofdstukken navertellen; korte functionele citaten.
- Eerlijke "Sla dit boek over als…" aanbevelingen, niet alleen koopadvies.

### Boekfrontmatter

Verplicht: `title`, `subtitle`, `authors`, `publisher`, `year`, `pages`, `categories`, `publishedAt`, `excerpt`, `coreIdea`, `forWhom`, `notForWhom`, `strongPoints`, `weakPoints`, `similarBooks`, `scores`, `lessons`, `affiliate.managementboek`.

Optioneel:
- `isbn` — als gezet, wordt cover automatisch afgeleid van `i.mgtbk.nl/boeken/<isbn>-920x960.jpg`
- `coverImage` — overschrijft auto-derive
- `infographic` — pad of URL naar infographic afbeelding

`publishedAt` bepaalt de sorteervolgorde op homepage en overzicht (nieuwste boven). Voor de top-100 zijn datums teruggeteld vanaf 2026-04-24 (Van doel naar deal #1).

### Categoriecontent

In `content/categories/<slug>.md`:
```yaml
intro: "Korte intro die boven aan de pagina komt"
forWhom: ["doelgroep 1", "doelgroep 2"]
topPick: "boek-slug"          # optioneel, een topkeuze
relatedCategories: ["..."]    # optioneel, klikbare badges
```
Gevolgd door markdown body die als `prose-editorial` rendert.

12 categorieën hebben uitgebreide content (Leiderschap, Persoonlijke ontwikkeling, etc.). Andere categorieën tonen alleen de standaardlijst.

## Workflows

### Nieuwe boekpagina

```bash
npm run new-book -- "Boektitel"
# vult template in content/boeken/<slug>.md
```

Daarna:
1. Frontmatter handmatig vullen
2. Body schrijven (zie schrijfstijl-conventies)
3. ISBN toevoegen → cover verschijnt automatisch
4. Build & push naar beide branches

### ISBN(s) toevoegen aan bestaande boeken

```bash
npm run set-isbn -- <slug> <isbn> [<slug> <isbn>...]
```

Werkt bulk. Zet ISBN in frontmatter, cover wordt door `lib/books.ts` afgeleid (`coverFromIsbn`).

### Infographic toevoegen

1. Erik upload PNG/JPG naar `public/infographics/` via GitHub web-UI
2. Update frontmatter: `infographic: /infographics/<bestandsnaam>`
3. Verschijnt automatisch in een eigen sectie tussen "De kern" en "Belangrijkste lessen"

### Standaard commit + push

```bash
npm run build  # altijd eerst lokaal valideren
git add -A
git commit -m "..."
git push origin claude/review-project-setup-smbxU
git push origin claude/review-project-setup-smbxU:main
```

Beide branches synchroon houden voorkomt rare Vercel-deploy-situaties.

## Status (april 2026)

**39 boekpagina's live**, dekkend posities **1-25** + **36-50** uit Managementboek Top 100. Alle 39 hebben ISBN + cover. Eén dubbel: The Culture Map staat op #4 (NL) en #9 (EN) — gedeeld 1 pagina.

**Van doel naar deal** is de flagship-bespreking met volledige uitwerking (auteursachtergrond, Harvard-fundament, 7 lessen, voorbereidingswerkblad, 4 scenarios, Dutch diseases, koffie-metafoor, 4 AI-prompts, vergelijking met andere boeken, 8 FAQs, uitgebreid oordeel). Heeft ook een infographic.

**Mobiele responsive** is op orde (april 2026 ronde 1+2+3): titel-typografie schaalt, sidebar niet sticky op mobiel, buy-button verschijnt vroeg, code-blocks scrollen intern zonder de pagina mee te trekken, navbar wrapt netjes.

**Categoriepagina's** hebben intro-content voor de 12 hoofdthema's: Leiderschap, Persoonlijke ontwikkeling, Organisatiecultuur, Communicatie, Artificial Intelligence, Ondernemerschap, Verandermanagement, Productiviteit, HR, Teams, Strategie, Psychologie.

## Bekende beperkingen

- **Sandbox kan Managementboek.nl niet bereiken** (403 Host not in allowlist) — voor ISBN's en cover-URL's heeft Erik vaak screenshots of URLs nodig
- **ChatGPT shared chat-links** ook geblokkeerd vanuit sandbox
- **GitHub MCP push** werkt voor tekstbestanden, niet voor binary uploads — daarom doet Erik image-uploads via GitHub web-UI

## Open punten

1. **Gat-vulling**: posities **26-35** uit Managementboek Top 100 ontbreken. Wachten op screenshots van Erik.
2. **Optionele cleanup**: de Van doel naar deal infographic heet `78F43431-35C7-4AEB-9A6E-22E7FED7B435.png` (iPhone UUID). Werkt prima, maar voor een nettere repo zou hernoemen naar `van-doel-naar-deal.png` mooier zijn.
3. **Affiliate IDs**: alle managementboek-links zijn nu generieke boekpagina's of zoeklinks. Echt affiliate-ID nog niet ingevoegd.
4. **Vercel production branch**: staat nu op `claude/review-project-setup-smbxU`. Erik kan dit later omzetten naar `main` (Settings → Git → Production Branch).

## Tone-of-voice voorbeelden

**Wel zo:**
> "Wie *Getting to Yes* of *Never Split the Difference* kent, vindt hier weinig conceptueel nieuws."

> "Sla dit boek over als je in transactionele high-volume sales zit."

**Niet zo:**
> ~~"Een revolutionair boek dat je leven zal veranderen!"~~
> ~~"Must-read voor iedere manager"~~ (te marketingerig)

## Belangrijke bestanden om te lezen

Voor context bij specifieke taken:
- `content/boeken/van-doel-naar-deal.md` — voorbeeld van een volledig uitgewerkte bespreking
- `content/boeken/spreken-als-een-baas.md` — voorbeeld van een compacte bespreking
- `content/categories/leiderschap.md` — voorbeeld van categoriecontent
- `app/boeken/[slug]/page.tsx` — boekpagina template, zien hoe frontmatter wordt gerendered
- `lib/books.ts` — auto-derive logica voor covers via ISBN

## Snelle terugverwijzing voor nieuwe chat

> "Hi, lees CLAUDE.md zodat je weet wat de status is. Ik wil graag X."

Dat is genoeg om aangehaakt te raken.
