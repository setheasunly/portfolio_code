// About.tsx: your story plus illustrated cards for each part of your life.
import Reveal from "@/components/Reveal";
import { CodeIcon, RunIcon, BikeIcon, CameraIcon, TravelIcon, SignatureLine } from "@/components/Illustrations";

// Edit the cards here — each has an icon, a title and a short placeholder text.
const cards = [
  { Icon: CodeIcon, title: "ICT & Software", text: "[Placeholder] What you build and study." },
  { Icon: RunIcon, title: "Running", text: "[Placeholder] Marathons and charity runs." },
  { Icon: BikeIcon, title: "Cycling", text: "[Placeholder] Favourite rides and routes." },
  { Icon: CameraIcon, title: "Photography", text: "[Placeholder] What you love to shoot." },
  { Icon: TravelIcon, title: "Travel", text: "[Placeholder] Places that shaped you." },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">About Me</p>
            <h2 className="mt-3 font-serif text-4xl">A little about me</h2>
            <SignatureLine className="mt-3 w-28 text-accent" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed md:col-span-2">
            <p>[Placeholder] Your background and education go here.</p>
            <p className="text-muted">[Placeholder] Your interests in ICT, software development and project management, and where you want your career to go.</p>
          </div>
        </Reveal>

        {/* Illustrated cards: each one fades in a little after the previous (delay) */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-line bg-white/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.15)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-foreground/80 transition group-hover:bg-accent/20 group-hover:text-accent">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
