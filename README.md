# SAAZA Study Tools

Live site: **https://rcarney94.github.io/saaza-calculator**

Interactive study tools for MSAAZA course. Created by Ryan Carney, MSgt, 136CRF.

Last updated: June 17, 2026

## Tools

### Calculators
- **LZ Trig Calculator** — Obstruction height, straight-line distance, elevation difference, finding θ, two-angle structure height, LZ clearance pass/fail, and unit conversions
- **SPACI Calculator** — Scores semi-prepared airfield surface condition (Green/Amber/Red) for C-17 and C-130. Computes Total Deduct Value and q exactly with full work shown; final SPACI read from the authoritative TSPWG 3-260-03.02-19 curve and lookup tables (embedded, zoomable)
- **Drop Zone Size & PI Calculator** — Minimum DZ dimensions and Point of Impact placement via the MANFAS method, with every number sourced from DAFMAN 13-217 (Tables 3.1 & 3.2) and every adjustment shown. Supports CDS, Personnel, and Heavy Equipment for C-17 and C-130
- **DCP Calculator** — Dynamic Cone Penetrometer data reduction. Enter penetration readings (blows + depth) and it computes DCP index → CBR per interval (TSPWG Tables 2-3/2-4, verified equations), builds the depth-vs-CBR profile, groups layers, and flags the controlling (weakest) layer. Multi-hole survey support, persistent entries, import/export, and export to the official DCP Data Sheet format (TSPWG Figure 2-13). The controlling CBR is the value carried into the allowable-passes determination, which is read from the appropriate aircraft evaluation chart or computed in PCASE

### Search
- **Reference Search** — Search across 6 SAAZA publications simultaneously (1,986 pages indexed)
- **Quick Reference Search** — Search all course slides across 8 units (395 slides), expandable results with direct slide links

### Field Tools
- **Team Lead Checklist** — The 4-phase SAAZA process (Information Gathering, Preparation, Site Visit, Final Product Development) as an interactive checklist with notes and saved progress. A downloadable Excel version (`SAAZA_Team_Lead_Checklist.xlsx`) is also in the repo
- **DCP Test Locations** — Where to place DCP readings on a landing zone, with a Full vs. Hasty survey toggle: an original top-down diagram of the test pattern (centerline, main-gear wheel paths, overruns, edges, turnarounds) plus written guidance and the test procedure (two-person operation, 36-in rods, 6-in plumb rule, record to 0.2 in / 5 mm on the DCP Data Sheet). Built from ETL 97-9 (Fig C.2) and TSPWG 3-260-03.02-19 — both Distribution Unlimited

### Flashcard Decks (279 cards total)
- **⭐ Mega Deck** — All 279 cards across all 8 units, filterable by unit
- **Unit 1 — Overview & Math** (57 cards)
- **Unit 2.1 — Drop Zone Criteria** (31 cards)
- **Unit 2.2 — Helicopter LZ Criteria** (21 cards)
- **Unit 2.3 — ALZ Fixed Wing Criteria** (23 cards)
- **Unit 3 — Soils & Distresses** (51 cards)
- **Units 3/5 — Survey Forms** (33 cards)
- **Unit 4 — SAAZA Process** (27 cards)
- **Unit 5 — SAAZA Completion** (32 cards)

### Reference Publications
- UFC 3-260-01 (2019, Change 3)
- TM 3-34.48-2 (2016)
- DAFMAN 13-217 (2021, Change 1: 2022)
- TSPWG 3-260-03.02-19 (2020)
- ETL 02-19 (2002) — Superseded by TSPWG
- ETL 97-9 (2002)

## Usage
All tools work directly in any mobile or desktop browser. No app installation required. Works offline once loaded.

## File Structure
- Root: HTML tools, flashcard decks, and the Team Lead Checklist Excel file
- `/refs/`: Reference publication PDFs
- `/slides/`: Course slide PDFs (LibreOffice-converted for Quick Reference Search)
