// Contact.tsx: ways to reach you. Edit the hrefs below with your real links.
import Reveal from "@/components/Reveal";
import { SignatureLine } from "@/components/Illustrations";

const contacts = [
  { label: "Email", href: "mailto:you@example.com", text: "you@example.com" }, // PLACEHOLDER
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile", text: "linkedin.com/in/your-profile" }, // PLACEHOLDER
  { label: "GitHub", href: "https://github.com/your-username", text: "github.com/your-username" }, // PLACEHOLDER
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      {/* soft background blob */}
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <Reveal className="relative mx-auto grid max-w-6xl gap-10 px-6 py-28 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h2 className="mt-3 font-serif text-4xl">Let&apos;s talk</h2>
          <SignatureLine className="mt-3 w-28 text-accent" />
        </div>
        <ul className="divide-y divide-line md:col-span-2">
          {contacts.map((c) => (
            <li key={c.label}>
              {/* the arrow slides right on hover */}
              <a href={c.href} className="group flex items-center justify-between py-5">
                <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-24 text-sm text-muted">{c.label}</span>
                  <span className="text-lg transition group-hover:text-accent">{c.text}</span>
                </span>
                <span className="text-muted transition group-hover:translate-x-1 group-hover:text-accent">→</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
