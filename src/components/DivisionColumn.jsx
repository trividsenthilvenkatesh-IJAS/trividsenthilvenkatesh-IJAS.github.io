import AwardEntry from "./AwardEntry";

export default function DivisionColumn({ title, entries }) {
  return (
    <section>
      <h5 className="text-[12px] font-semibold uppercase tracking-wide text-ijas-navy">{title}</h5>
      {entries.length === 0 ? (
        <p className="mt-2 text-[13px] text-ijas-muted">None in this division.</p>
      ) : (
        <ul className="mt-2.5 flex list-none flex-col gap-2">
          {entries.map((entry, index) => (
            <li key={`${entry.students}-${entry.title}-${index}`}>
              <AwardEntry {...entry} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
