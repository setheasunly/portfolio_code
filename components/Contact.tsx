// Contact.tsx: ways to reach you. Edit the hrefs below with your real links.
const contacts = [
  { label: "Email", href: "mailto:you@example.com", text: "you@example.com" }, // PLACEHOLDER
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile", text: "linkedin.com/in/your-profile" }, // PLACEHOLDER
  { label: "GitHub", href: "https://github.com/your-username", text: "github.com/your-username" }, // PLACEHOLDER
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-24 md:grid-cols-3">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Contact</h2>
        <ul className="space-y-4 md:col-span-2">
          {contacts.map((c) => (
            <li key={c.label} className="flex flex-col sm:flex-row sm:gap-6">
              <span className="w-24 text-sm text-muted">{c.label}</span>
              <a href={c.href} className="text-lg underline-offset-4 hover:underline">
                {c.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
