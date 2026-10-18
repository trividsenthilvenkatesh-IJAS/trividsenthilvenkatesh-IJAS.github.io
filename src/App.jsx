import { useEffect, useState } from "react";
import AwardsSection from "./components/AwardsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import YearTabs from "./components/YearTabs";
import { YEAR_EVENTS } from "./data/years";

export default function App() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    document.title = `${YEAR_EVENTS[year].title} | Illinois Junior Academy of Science`;
  }, [year]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero year={year} />
        <YearTabs year={year} onChange={setYear} />
        <AwardsSection key={year} year={year} />
      </main>
      <Footer />
    </div>
  );
}
