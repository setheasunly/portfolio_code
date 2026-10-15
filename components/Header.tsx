// Header.tsx: the top bar with your name and links that scroll to each section.
const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    // "sticky top-0" keeps the header visible while scrolling; backdrop-blur frosts what's behind it
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#home" className="font-serif text-lg italic tracking-tight">
          {/* PLACEHOLDER: Your Name */}
          Your Name<span className="text-accent">.</span>
        </a>
        <ul className="flex gap-6 text-sm text-muted">
          {links.map((link) => (
            <li key={link.href}>
              {/* the after: line grows underneath on hover */}
              <a href={link.href} className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
