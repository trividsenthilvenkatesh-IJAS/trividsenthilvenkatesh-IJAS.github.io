import { useMemo, useState } from "react";
import CategoryAccordion from "./CategoryAccordion";
import FilterBar from "./FilterBar";
import { awardsData, categories, omittedIncompleteRows } from "../data/awardsData";

function hasEpic(project) {
  return project.awards.some((award) => /epic/i.test(award));
}

function hasOtherSpecial(project) {
  return project.awards.some((award) => !/epic/i.test(award));
}

function matchesAwardType(project, type) {
  if (type === "epic") return hasEpic(project);
  if (type === "special") return hasOtherSpecial(project);
  if (type === "gold") return project.medal === "gold";
  if (type === "silver") return project.medal === "silver";
  return false;
}

function highlightFor(project, awardTypes) {
  const epicOn = awardTypes.includes("epic");
  const specialOn = awardTypes.includes("special");
  if (!epicOn && !specialOn) return null;
  if (epicOn && hasEpic(project)) return "epic";
  if (specialOn && hasOtherSpecial(project)) return "special";
  return null;
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const score = (project) => (hasEpic(project) ? 0 : hasOtherSpecial(project) ? 1 : 2);
    return score(a) - score(b) || a.students.localeCompare(b.students);
  });
}

function summaryLine(projects) {
  const parts = [];
  const epic = projects.filter(hasEpic).length;
  const special = projects.filter(hasOtherSpecial).length;
  const gold = projects.filter((project) => project.medal === "gold").length;
  const silver = projects.filter((project) => project.medal === "silver").length;
  if (epic) parts.push(`${epic} EPIC${epic === 1 ? "" : "s"}`);
  if (special) parts.push(`${special} Special Award${special === 1 ? "" : "s"}`);
  if (gold) parts.push(`${gold} Gold`);
  if (silver) parts.push(`${silver} Silver`);
  return parts.join(" · ");
}

function splitDivision(projects) {
  return {
    highSchool: projects.filter((project) => project.division === "highSchool"),
    middleSchool: projects.filter((project) => project.division === "middleSchool"),
  };
}

export default function AwardsSection() {
  const [division, setDivision] = useState("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [awardTypes, setAwardTypes] = useState([]);
  const needle = query.trim().toLowerCase();

  function toggleAward(type) {
    setAwardTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );
  }

  const filteredRows = useMemo(() => {
    return awardsData
      .filter((row) => category === "all" || row.category === category)
      .map((row) => {
        const projects = sortProjects(
          row.projects.filter((project) => {
            if (division === "senior" && project.division !== "highSchool") return false;
            if (division === "junior" && project.division !== "middleSchool") return false;
            if (awardTypes.length > 0 && !awardTypes.some((type) => matchesAwardType(project, type))) return false;
            if (!needle) return true;
            return [project.title, project.students, row.category, ...project.awards]
              .join("\n")
              .toLowerCase()
              .includes(needle);
          }),
        ).map((project) => ({ ...project, highlight: highlightFor(project, awardTypes) }));

        return { category: row.category, projects };
      })
      .filter((row) => row.projects.length > 0);
  }, [awardTypes, category, division, needle]);

  const projectCount = filteredRows.reduce((sum, row) => sum + row.projects.length, 0);
  const specialCount = filteredRows.reduce(
    (sum, row) => sum + row.projects.filter((project) => project.awards.length > 0).length,
    0,
  );
  const forceOpen = needle.length > 0 || awardTypes.length > 0;

  return (
    <section id="awards" className="bg-white px-5 py-8 sm:px-8 md:py-10" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-[1100px]">
        <h2 id="awards-heading" className="text-2xl font-bold text-ijas-navy md:text-3xl">
          Category Awards
        </h2>
        <p className="mt-2 max-w-[760px] text-[15px] leading-relaxed text-[#374151]">
          Gold, Silver, and special award recipients from the 2026 State Exposition.
        </p>
        {omittedIncompleteRows > 0 ? (
          <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-ijas-muted">
            {omittedIncompleteRows} exhibitor rows were omitted because a student name or project title was missing.
          </p>
        ) : null}

        <FilterBar
          division={division}
          onDivision={setDivision}
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          categories={categories}
          awardTypes={awardTypes}
          onToggleAward={toggleAward}
          projectCount={projectCount}
          specialCount={specialCount}
        />

        <div className="mt-2">
          {filteredRows.length === 0 ? (
            <p className="py-10 text-[#374151]">No projects match these filters.</p>
          ) : (
            filteredRows.map((row) => (
              <CategoryAccordion
                key={row.category}
                category={row.category}
                projectCount={row.projects.length}
                collapsedSummary={summaryLine(row.projects)}
                specialAwards={splitDivision(row.projects.filter((project) => project.awards.length > 0))}
                goldWinners={splitDivision(row.projects.filter((project) => project.medal === "gold"))}
                silverWinners={splitDivision(row.projects.filter((project) => project.medal === "silver"))}
                forceOpen={forceOpen}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
