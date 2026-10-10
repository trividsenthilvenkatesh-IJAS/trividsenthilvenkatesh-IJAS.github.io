import DivisionColumn from "./DivisionColumn";

export default function SpecialAwardsSection({ highSchool = [], middleSchool = [] }) {
  if (highSchool.length === 0 && middleSchool.length === 0) return null;

  return (
    <section aria-label="Awards and special awards">
      <h4 className="text-[15px] font-bold text-ijas-navy">Awards / Special Awards</h4>
      <div className="category-columns mt-2 grid gap-4 sm:grid-cols-2">
        <DivisionColumn title="High School Division" entries={highSchool} />
        <DivisionColumn title="Middle School Division" entries={middleSchool} />
      </div>
    </section>
  );
}
