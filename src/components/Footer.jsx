const pageLinks = [
  { label: "Home", href: "https://www.ijas.org/" },
  { label: "Students", href: "https://www.ijas.org/students" },
  { label: "Teachers", href: "#teachers" },
  { label: "Contact", href: "mailto:info@ijas.org" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/IJASorg" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/illinois-junior-academy-of-science-a02159365",
  },
  { label: "Instagram", href: "https://www.instagram.com/ijas_il" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-ijas-navy text-white">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[15px] font-semibold leading-snug">Illinois Junior Academy of Science</p>
          <p className="mt-2 text-sm text-white/80">Since 1927</p>
        </div>
        <nav className="flex flex-col gap-1 text-sm" aria-label="Footer">
          {pageLinks.map((link) => (
            <a key={link.label} href={link.href} className="w-fit hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="flex flex-col gap-1 text-sm" aria-label="Social">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} className="w-fit underline">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm">
          Contact:{" "}
          <a href="mailto:info@ijas.org" className="underline">
            info@ijas.org
          </a>
        </p>
      </div>
      <div className="mx-auto max-w-[1100px] px-6 pb-8 text-xs text-white/75">
        <p>© 2026 Illinois Junior Academy of Science</p>
      </div>
    </footer>
  );
}
