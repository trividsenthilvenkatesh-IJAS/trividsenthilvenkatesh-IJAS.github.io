# IJAS 2026 State Exposition Awards

Illinois Junior Academy of Science 2026 State Science Exposition awards.

April 24–25, 2026 · Southern Illinois University, Carbondale

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

Project records live in `src/data/awardsData.js`. The page lists Gold recipients, Silver recipients, and any project that also received a special award. Each category has a `projects` list. An entry is `{ title, students, awards, medal, division }`. High school is grades 9–12. Middle school is grades 7–8. The collapsed line is a short count such as `4 EPICs · 12 Gold · 3 Silver`, with no student names or project titles. Special awards render in bold above the student names.

Rows that were missing a student name or a project title are counted in `omittedIncompleteRows` and are not shown.
