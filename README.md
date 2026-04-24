# Managementboekgids

De beste managementboeken van Nederland, samengevat en vertaald naar praktische lessen voor managers, ondernemers en professionals.

## Stack

- **Next.js 14** (App Router, server components, static generation)
- **TypeScript** strict
- **Tailwind CSS** met `@tailwindcss/typography`
- **Markdown + frontmatter** voor alle boekcontent (`content/boeken/*.md`)
- **Remark/GFM** voor markdown-rendering

## Aan de slag

```bash
npm install
npm run dev
```

De site draait dan op `http://localhost:3000`.

## Dagelijks een boek publiceren

### 1. Nieuw boek aanmaken

```bash
npm run new-book -- "Titel van het boek"
```

Dit maakt `content/boeken/<slug>.md` aan met een lege template.

### 2. Frontmatter vullen

Elke boekpagina wordt volledig gedreven door de frontmatter en de markdown body. Vaste velden:

- `title`, `subtitle`, `authors`, `publisher`, `year`, `pages`
- `categories`: lijst, bepaalt automatisch de categorie-pagina's
- `publishedAt`: `YYYY-MM-DD`, sorteert de homepage en overzichten
- `excerpt`: korte samenvatting (1-2 zinnen) voor cards en meta-description
- `coreIdea`: één zin die de kernboodschap vangt
- `forWhom` / `notForWhom`: doelgroep-bullets
- `strongPoints` / `weakPoints`: evaluatie-bullets
- `similarBooks`: lijst met titels
- `scores`: 0-10 op vier assen
- `lessons`: lijst met `{ title, description }`, de belangrijkste lessen
- `affiliate.managementboek`: URL naar de Managementboek.nl-pagina
- `coverImage`: URL of pad naar de boekcover. Externe URL (`https://...`) werkt direct, of plaats een lokaal bestand in `public/covers/<isbn>.jpg` en verwijs via `/covers/<isbn>.jpg`

### 3. Review schrijven

In de markdown body schrijf je de eigenlijke bespreking. Vaste secties:

- Waar gaat dit boek over?
- Praktische toepassing (voor managers / ondernemers / teams)
- Sterke punten
- Zwakke punten
- Mijn oordeel

Houd de verhouding: ±25% samenvatting, ±30% toepassing, ±20% kritiek, ±15% vergelijking, ±10% koopadvies. Nooit hele hoofdstukken navertellen, de pagina is een **gids bij het boek**, geen vervanging.

## Contentprincipes

1. **Altijd eigen woorden.** Geen gekopieerde samenvattingen.
2. **Korte, functionele citaten**, nooit langer dan strikt nodig.
3. **Concrete toepassing toevoegen**, anders is het geen gids.
4. **Eerlijke beoordeling**, ook boeken afraden die niet bij de lezer passen.
5. **Affiliate links duidelijk labelen** (`rel="nofollow sponsored"` gebeurt automatisch).

## Affiliate-configuratie

Voeg per boek de Managementboek.nl-link toe onder `affiliate.managementboek`. De `AffiliateButton`-component zet automatisch `rel="nofollow sponsored noopener"` en `target="_blank"`. Er is een site-brede disclosure op `/affiliate`.

## Deploy

Geoptimaliseerd voor Vercel:

```bash
npm run build
```

Alle pagina's worden statisch gegenereerd; elke nieuwe markdown in `content/boeken/` verschijnt automatisch in:

- de homepage (nieuwste eerst)
- `/boeken`
- de juiste `/categorie/<slug>`-pagina's
