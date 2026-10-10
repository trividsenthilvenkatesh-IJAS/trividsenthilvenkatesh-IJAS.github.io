export default function AwardEntry({ title, students, awards = [] }) {
  return (
    <article className="winner-card rounded border border-[#e5e7eb] bg-ijas-wash px-3 py-2">
      <p className="text-[15px] font-bold leading-snug text-ijas-ink">{title}</p>
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
