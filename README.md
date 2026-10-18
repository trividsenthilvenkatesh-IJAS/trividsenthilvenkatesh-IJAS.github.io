# IJAS State Exposition Awards

Illinois Junior Academy of Science State Science Exposition awards for 2025 and 2026.

2025: May 2–3, 2025 · University of Illinois Urbana-Champaign
2026: April 24–25, 2026 · Southern Illinois University, Carbondale

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://127.0.0.1:5176/`.

```bash
npm run build
npm run preview
```

## Awards data

The 2025 records live in `src/data/awards2025.js`. The 2026 records live in `src/data/awards2026.js`. The page lists Gold recipients, Silver recipients, and any project that also received a special award. Each category has a `projects` list. An entry is `{ title, students, awards, medal, division }`. High school is grades 9–12. Middle school is grades 7–8. The collapsed line is a short count such as `3 EPICs · 5 Special · 8 Gold`, with no student names or project titles. A project appears once: under EPIC Awards if it received an EPIC, otherwise under Special / Sponsored Awards, otherwise under Gold or Silver. Sponsor names render in bold above the student names.

Rows that were missing a student name or a project title are counted in `omittedIncompleteRows` and are not shown.
