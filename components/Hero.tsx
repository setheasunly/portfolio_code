// Hero.tsx: the big first section visitors see — your name, intro and statement.
export default function Hero() {
  return (
    <section id="home" className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-6 py-24">
      <p className="fade-in text-sm uppercase tracking-[0.2em] text-muted">Hello, I&apos;m</p>
      <h1 className="fade-in mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
        Your Name {/* PLACEHOLDER */}
      </h1>
      <p className="fade-in-delay mt-6 max-w-xl text-lg leading-relaxed text-muted">
        [Placeholder] A one-sentence introduction — e.g. ICT student, developer and runner.
        Replace this with your personal statement.
      </p>
    </section>
  );
}
