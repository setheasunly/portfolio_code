// About.tsx: your story — background, education, interests and journey.
export default function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-24 md:grid-cols-3">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted">About Me</h2>
        <div className="space-y-5 text-lg leading-relaxed md:col-span-2">
          <p>[Placeholder] Your background and education go here.</p>
          <p className="text-muted">
            [Placeholder] Your interests in ICT, software development and project management.
          </p>
          <p className="text-muted">
            [Placeholder] Your personal side — running, cycling, marathons, photography, travel.
          </p>
        </div>
      </div>
    </section>
  );
}
