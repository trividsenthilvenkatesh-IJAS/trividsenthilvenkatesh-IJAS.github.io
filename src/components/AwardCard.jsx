const DOT = {
  gold: "bg-[#C6A15B]",
  silver: "bg-[#9AA0A6]",
};

const DOT_LABEL = {
  gold: "Gold award",
  silver: "Silver award",
};

export default function AwardCard({ title, students, awards = [], medal, highlight = null }) {
  const accent =
    highlight === "epic"
      ? "border-l-[3px] border-l-ijas-maroon"
      : highlight === "special"
        ? "border-l-[3px] border-l-ijas-navy"
        : "";

  return (
    <article className={`winner-card rounded border border-[#e5e7eb] bg-ijas-wash px-3 py-2 ${accent}`}>
      <p className="flex items-start gap-2 text-[15px] font-bold leading-snug text-ijas-ink">
        {DOT[medal] ? (
          <span className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${DOT[medal]}`}>
            <span className="sr-only">{DOT_LABEL[medal]}. </span>
          </span>
        ) : null}
        <span>{title}</span>
      </p>
      {awards.map((award) => {
        const epic = /epic/i.test(award);
        return (
          <p
            key={award}
            className={`mt-1 text-[13px] font-bold leading-snug ${epic ? "text-ijas-maroon" : "text-ijas-navy"}`}
          >
            {award}
          </p>
        );
      })}
      <p className={`text-[13px] leading-snug text-[#374151] ${awards.length ? "mt-0.5" : "mt-1"}`}>{students}</p>
    </article>
  );
}
