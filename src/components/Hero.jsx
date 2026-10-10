export default function Hero() {
  return (
    <section className="relative flex h-[220px] items-center justify-center overflow-hidden md:h-[300px]" aria-labelledby="hero-title">
      <img
        src="/audience.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E3B7B]/80 via-[#0E3B7B]/65 to-[#0E3B7B]/75" />
      <div className="relative px-6 text-center text-white">
        <h1 id="hero-title" className="text-[34px] font-bold leading-tight md:text-[56px]">
          2026 State Exposition Awards
        </h1>
        <p className="mt-3 text-[16px] md:text-[18px]">April 24–25, 2026</p>
        <p className="mt-1 text-[16px] md:text-[18px]">Southern Illinois University, Carbondale</p>
      </div>
    </section>
  );
}
