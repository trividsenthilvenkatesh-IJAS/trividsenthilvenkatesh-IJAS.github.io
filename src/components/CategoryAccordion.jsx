import { useId, useState } from "react";
import DivisionColumn from "./DivisionColumn";

function epicLine(item) {
  const label = item.award.replace(/\s+-\s+/, " – ");
  return `${label}: ${item.students} – ${item.title}`;
}

export default function CategoryAccordion({
  category,
  epicPreview = [],
  highSchool,
  middleSchool,
  defaultOpen = false,
  forceOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const expanded = forceOpen || open;
  const panelId = useId();
  const headingId = useId();
  const count = highSchool.length + middleSchool.length;

  return (
    <article className="border-b border-[#e5e7eb]">
      <div className="grid gap-2 py-3 md:grid-cols-[minmax(180px,220px)_1fr] md:items-start md:gap-6 md:py-3.5">
        <h3 id={headingId} className="text-lg font-bold leading-snug text-ijas-navy md:text-xl">
          <button
            type="button"
            className="flex w-full items-start justify-between gap-3 text-left"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span>{category}</span>
            <svg
              viewBox="0 0 20 20"
              className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </h3>

        <div>
          {expanded ? null : (
            <button
              type="button"
              className="accordion-preview w-full text-left text-[13px] leading-snug"
              onClick={() => setOpen(true)}
            >
              {epicPreview.length > 0 ? (
                <span className="flex flex-col gap-1">
                  {epicPreview.map((item) => (
                    <span key={`${item.award}-${item.students}`} className="block font-bold text-ijas-maroon">
                      {epicLine(item)}
                    </span>
                  ))}
                  <span className="mt-1 block font-normal text-ijas-muted">{count} projects</span>
                </span>
              ) : (
                <span className="text-[#374151]">{count} projects</span>
              )}
            </button>
          )}

          <div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            aria-hidden={expanded ? undefined : true}
            className={`accordion-panel ${expanded ? "is-open" : ""}`}
          >
            <div>
              <div className="category-columns grid gap-6 sm:grid-cols-2">
                <DivisionColumn title="High School Division" entries={highSchool} />
                <DivisionColumn title="Middle School Division" entries={middleSchool} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
