import AwardsSection from "./components/AwardsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AwardsSection />
      </main>
      <Footer />
    </div>
  );
}
