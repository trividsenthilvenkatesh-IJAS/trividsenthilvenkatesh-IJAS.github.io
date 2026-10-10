import { useEffect, useId, useState } from "react";

const navLinks = [
  { label: "Home", href: "https://www.ijas.org/" },
  { label: "About", href: "https://www.ijas.org/who-we-are" },
  { label: "Students", href: "https://www.ijas.org/students" },
  { label: "Teachers", href: "#teachers" },
  { label: "Judges", href: "#judges" },
  { label: "Awards & Results", href: "#awards", current: true },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

function NavLinks({ onNavigate, className }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            onClick={onNavigate}
            aria-current={link.current ? "page" : undefined}
            className={`inline-block border-b-2 pb-0.5 text-[15px] text-ijas-navy ${
              link.current ? "border-ijas-sky font-semibold" : "border-transparent hover:border-ijas-sky"
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white print:static">
      <a
        href="#awards"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to awards
      </a>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="https://www.ijas.org/" className="flex min-w-0 items-center gap-3">
          <img src="/ijas-seal.png" alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="text-[15px] font-semibold leading-tight text-ijas-navy sm:text-[17px]">
            Illinois Junior Academy of Science
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Primary">
          <NavLinks className="flex items-center gap-x-4" />
        </nav>

        <button
          type="button"
          className="no-print inline-flex h-10 w-10 items-center justify-center border border-ijas-navy text-ijas-navy lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav id={menuId} className="no-print border-t border-black/10 px-4 py-3 lg:hidden" aria-label="Mobile">
          <NavLinks
            className="flex flex-col gap-3"
            onNavigate={() => setOpen(false)}
          />
        </nav>
      ) : null}
    </header>
  );
}
