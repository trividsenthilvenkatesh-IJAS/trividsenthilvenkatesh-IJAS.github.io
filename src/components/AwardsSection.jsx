import { useMemo, useState } from "react";
import CategoryAccordion from "./CategoryAccordion";
import { awardsData, omittedIncompleteRows } from "../data/awardsData";

function entryMatches(entry, needle) {
  return [entry.title, entry.students, ...(entry.awards || [])]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(needle));
}

function previewMatches(item, needle) {
  return [item.award, item.students, item.title].some((value) => value.toLowerCase().includes(needle));
}

export default function AwardsSection() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!needle) return awardsData;

    return awardsData
      .map((row) => {
        if (row.category.toLowerCase().includes(needle)) return row;
        return {
          ...row,
          epicPreview: row.epicPreview.filter((item) => previewMatches(item, needle)),
          highSchool: row.highSchool.filter((entry) => entryMatches(entry, needle)),
          middleSchool: row.middleSchool.filter((entry) => entryMatches(entry, needle)),
        };
      })
      .filter((row) => row.highSchool.length > 0 || row.middleSchool.length > 0);
  }, [needle]);

  return (
    <section id="awards" className="bg-white px-5 py-8 sm:px-8 md:py-10" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-[1100px]">
        <h2 id="awards-heading" className="text-2xl font-bold text-ijas-navy md:text-3xl">
          Category Awards
        </h2>
        <p className="mt-2 max-w-[760px] text-[15px] leading-relaxed text-[#374151]">
          Gold Award recipients and projects that received special or EPIC awards.
        </p>
        {omittedIncompleteRows > 0 ? (
          <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-ijas-muted">
            {omittedIncompleteRows} exhibitor rows were omitted because a student name or project
            title was missing.
          </p>
        ) : null}

        <label className="no-print mt-5 block max-w-md text-sm font-semibold text-ijas-navy" htmlFor="category-filter">
          Search categories, projects, or students
          <input
            id="category-filter"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chemistry, EPIC, or a student name"
            className="mt-2 w-full rounded-md border border-[#d1d5db] bg-ijas-wash px-3 py-2 text-base font-normal text-ijas-ink"
          />
        </label>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="py-10 text-[#374151]">No categories match “{query.trim()}”.</p>
          ) : (
            filtered.map((row) => (
              <CategoryAccordion key={row.category} {...row} forceOpen={needle.length > 0} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
