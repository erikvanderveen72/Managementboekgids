# Deep Research-prompt: flagship-bespreking voor Managementboekgids.nl

Plak deze prompt in ChatGPT Deep Research, Claude Research of Gemini Deep Research. Vervang `[BOEKTITEL]` en `[AUTEUR(S)]` bovenaan, voeg eventueel eigen leesindrukken toe als extra context, en geef de tool de tijd om bronnen te verzamelen voor hij begint te schrijven.

De output is bedoeld om één-op-één in `content/boeken/<slug>.md` te zetten. De structuur en velden zijn afgeleid van `content/boeken/van-doel-naar-deal.md`, de huidige flagship-pagina.

---

## DEEP RESEARCH PROMPT

Je bent een ervaren managementboekrecensent die schrijft voor **managementboekgids.nl**, een Nederlandse site die de beste managementboeken bespreekt voor managers, ondernemers en professionals. Je gaat een flagship-bespreking schrijven van het boek:

**[BOEKTITEL]** door **[AUTEUR(S)]**

Doel: het meest grondige Nederlandstalige referentieartikel over dit boek worden. Eerlijk, praktisch, met eigen analyse, geen reclamefolder.

### Stap 1: Doe grondig bronnenonderzoek voor je begint te schrijven

1. **Boek-feiten**. Vind: titel, ondertitel, auteur(s), uitgever, jaar, ISBN, pagina-aantal. Vind de Managementboek.nl-pagina voor de affiliate-link (`https://www.managementboek.nl/boek/<isbn>/...`).
2. **Auteursachtergrond**. Per auteur: opleiding, werkgevers, expertise, eerder werk, lezingen, podcasts. Bronnen: LinkedIn, eigen website, Wikipedia, persprofielen, interviews.
3. **Inhoud**. Zoek samenvattingen, fragmenten, recensies en interviews. Identificeer:
   - De centrale stelling of methode
   - De originele concepten of metaforen die alleen in dít boek voorkomen (vergelijk: in *Van doel naar deal* zijn dat de "Dutch diseases" en de "koffie-metafoor")
   - De hoofdstukstructuur en de belangrijkste lessen
4. **Theoretisch fundament**. Op welke bestaande school, methode of denker leunt het boek? (vergelijk: *Van doel naar deal* leunt op de Harvard Negotiation Project van Fisher & Ury). Beschrijf die in eigen woorden, niet als opsomming uit Wikipedia.
5. **Vergelijkingsboeken**. 4-6 boeken in hetzelfde domein, internationaal én Nederlandstalig. Voor elk: wat het toevoegt, voor wie het beter werkt, hoe het zich tot dit boek verhoudt.
6. **Eerlijke kritiek**. Zoek bestaande reviews op Bol.com, Managementboek-recensies, blogs, en Goodreads voor internationale equivalenten. Niet alleen de uitgeverstekst overnemen. Identificeer minstens 2-3 reële beperkingen.

### Stap 2: Schrijfstijl (niet-onderhandelbaar)

- **Toon**: professioneel, helder, eerlijk. Klinkt als een ervaren collega die het boek heeft gelezen, geen marketingmedewerker.
- **Geen em-dashes** (`—`). Gebruik komma of dubbele punt. Controleer dit expliciet voor je inlevert.
- **Geen superlatieven**: vermijd "must-read", "revolutionair", "verandert je leven", "onmisbaar in je boekenkast", "absolute aanrader".
- **Eigen analyse boven samenvatting**. Verhouding van de body, ongeveer:
  - 25% samenvatting (wat staat er, wat is het concept)
  - 30% praktische toepassing (oefeningen, scenario's, werkbladen)
  - 20% kritiek en context (zwakke punten, ontbrekende thema's)
  - 15% vergelijking (alternatieven, plek in de literatuur)
  - 10% koopadvies (wel/niet, voor wie)
- **Geen hele hoofdstukken navertellen**. Korte functionele citaten of parafrases. Het boek wordt niet vervangen door de bespreking.
- **Eerlijke "Sla dit boek over als…"** is verplicht, niet alleen koopaanbevelingen.

**Goede toon (wel zo):**
- "Wie *Getting to Yes* of *Never Split the Difference* kent, vindt hier weinig conceptueel nieuws."
- "Sla dit boek over als je in transactionele high-volume sales zit."
- "De grootste verdienste is dat het boek onderhandelen demystificeert."

**Slechte toon (niet zo):**
- ~~"Een revolutionair boek dat je leven zal veranderen!"~~
- ~~"Must-read voor iedere manager"~~
- ~~"Mag niet ontbreken in elke boekenkast"~~

### Stap 3: Output-format

Lever één markdownbestand met YAML-frontmatter aan het begin. De site rendert op basis van deze velden, dus houd je exact aan de structuur.

#### Frontmatter (verplicht)

```yaml
---
title: "..."
subtitle: "..."
authors:
  - "..."
publisher: "..."
year: 2026
pages: 000
isbn: "9789...."
categories:
  - "..."   # 1-3 categorieën, bv. "Leiderschap", "Communicatie"
publishedAt: "YYYY-MM-DD"
excerpt: "Eén alinea van 2-3 zinnen die de kern van de bespreking samenvat. Geen marketingtaal."
coreIdea: "Eén zin die de centrale stelling van het boek vangt."
forWhom:
  - "..."   # 4-6 concrete doelgroepen
notForWhom:
  - "..."   # 2-3 eerlijke uitsluitingen
strongPoints:
  - "..."   # 3-5 sterke punten
weakPoints:
  - "..."   # 2-4 zwakke punten
similarBooks:
  - "Titel, Auteur"   # 4-6 vergelijkbare boeken
scores:
  practicalValue: 8        # 1-10
  readability: 9
  originality: 6
  beginnerFriendly: 9
lessons:
  - title: "..."           # 5-8 lessen
    description: "..."     # 2-3 zinnen per les
affiliate:
  managementboek: "https://www.managementboek.nl/boek/<isbn>/..."
---
```

#### Body (in deze exacte volgorde)

1. `## Waar gaat dit boek over?` — 2-3 paragrafen context, plek in het domein, waarom het nu verschijnt
2. `## Over de auteurs` — 1 paragraaf per auteur (achtergrond, expertise, waarom hun combinatie of profiel relevant is)
3. `## Het [theorie/methode]-fundament in het kort` — alleen als het boek leunt op een bestaande school: leg in 4-5 punten de basis uit waarop het voortbouwt
4. `## De [N] lessen uitgewerkt` — één `### Les N, [titel]` per les, elk met 3-5 paragrafen plus een **concrete oefening, vuistregel of waarschuwing** in vetgedrukte voorzin
5. `## Het voorbereidingswerkblad` (of vergelijkbaar toepassingsraamwerk) — 5-7 vragen of stappen die de lezer letterlijk kan kopiëren naar zijn eigen voorbereiding
6. `## [Drie of vier] scenario's: hoe het boek in de praktijk werkt` — uitgewerkte herkenbare casussen, elk met "Klassieke aanpak" en "De [boek]-aanpak"
7. `## [Originele auteursconcepten]` — als het boek unieke concepten of metaforen introduceert, geef die een eigen sectie (de "Dutch diseases"-rol)
8. `## Tien veelgemaakte fouten die dit boek voorkomt` — genummerd, één regel per fout met korte toelichting
9. `## Pas dit boek toe met AI: vier prompts` — vier markdown-codeblokken met **kant-en-klare prompts** die de lezer in ChatGPT, Claude of Gemini kan plakken om het boek toe te passen op zijn eigen situatie. Geen "vat dit boek samen", maar concrete werkpromp­ts (bv. "Voorbereidingsanalyse", "Belangenanalyse tegenpartij", "Stress-rollenspel", "Afsluitende samenvatting")
10. `## Vergelijking met andere [domein]boeken` — 4-6 boeken elk met `### Titel, Auteur` en 1 paragraaf, daarna een vergelijkingstabel `## Welk boek wanneer?`
11. `## Veelgestelde vragen` — 6-8 echte vragen die een lezer realistisch heeft (geen verkooppraat). Voorbeelden van toon: "Heb ik het Engelse origineel ook nodig?", "Werkt dit ook in [specifieke context]?", "Wat als de andere partij ook dit boek heeft gelezen?"
12. `## Sterke punten` en `## Zwakke punten` — kort, eerlijk
13. `## Mijn oordeel` — 3-4 paragrafen eigen analyse. Niet de auteur na-aapt, maar plaatst het boek in context, benoemt verdiensten én beperkingen, geeft een gemotiveerd eindoordeel
14. `### Koop dit boek als…` — 5 bullets
15. `### Sla dit boek over als…` — 4 bullets, eerlijk
16. `### Eindscore` — markdowntabel met de vier scores en een algeheel oordeel
17. Afsluitende paragraaf van 2-3 zinnen die het boek positioneert
18. `> **Transparantie:**` blockquote: vermeld op welke bronnen de bespreking is gebaseerd en welke concepten aan het boek zijn toe te schrijven versus eigen vertaling van de principes naar de praktijk

### Stap 4: Kwaliteitscheck voor je inlevert

- [ ] Geen enkele em-dash (`—`) in de tekst. Zoek expliciet en vervang door komma of dubbele punt
- [ ] Frontmatter compleet, alle verplichte velden gevuld
- [ ] `excerpt` is 2-3 zinnen, geen marketingtaal
- [ ] Minstens één sectie zegt eerlijk voor wie het boek **niet** werkt
- [ ] De vier AI-prompts zijn concreet en direct bruikbaar, geen generieke samenvatprompts
- [ ] De vergelijkingstabel `Welk boek wanneer?` staat erin
- [ ] De transparantie-blockquote staat erin en benoemt expliciet welke concepten van de auteur(s) komen en welke jouw eigen vertaling zijn
- [ ] Geen superlatieven of uitgeversfoldertaal
- [ ] Body komt op ongeveer 3000-5000 woorden (vergelijkbaar met *Van doel naar deal*)

---

## Tips bij het gebruik

- **Geef context vooraf** als je het boek hebt gelezen: "Ik heb het boek gelezen, deze drie passages vond ik treffend: ..., ..., ...". Dat verhoogt de kwaliteit van de eigen analyse drastisch.
- **Laat de tool eerst bronnen verzamelen** voor je 'm laat schrijven. In ChatGPT Deep Research kan dat door eerst om een bronnenlijst te vragen, daarna pas om het artikel.
- **Iteratie verwacht**. Eerste versie is zelden af. Vraag specifiek om aanscherping van: (a) de eigen analyse in "Mijn oordeel", (b) de originaliteit van de AI-prompts, (c) eerlijke zwakke punten en "Sla dit boek over als…".
- **Controleer feiten** voor publicatie. Deep Research kan auteursrollen, jaartallen of concepten verzinnen. Verifieer ISBN, uitgever, pagina-aantal en biografische details bij twijfel.
