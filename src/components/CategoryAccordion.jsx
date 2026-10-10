import { useId, useState } from "react";
import GoldWinnersAccordion from "./GoldWinnersAccordion";
import SpecialAwardsSection from "./SpecialAwardsSection";

export default function CategoryAccordion({
  category,
  collapsedSummary = "",
  specialAwards,
  goldWinners,
  forceOpen = false,
}) {
  const [open, setOpen] = useState(false);
  const expanded = forceOpen || open;
  const panelId = useId();
  const headingId = useId();

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
              className="accordion-preview w-full text-left text-[13px] font-normal leading-snug text-ijas-muted"
              onClick={() => setOpen(true)}
            >
              {collapsedSummary}
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
              <SpecialAwardsSection
                highSchool={specialAwards.highSchool}
                middleSchool={specialAwards.middleSchool}
              />
              <GoldWinnersAccordion
                highSchool={goldWinners.highSchool}
                middleSchool={goldWinners.middleSchool}
                forceOpen={forceOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
