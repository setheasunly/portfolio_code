// page.tsx: the homepage ("/"). It simply stacks our section components in order.
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Photography from "@/components/Photography";
import FpvVideo from "@/components/FpvVideo";
import Running from "@/components/Running";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Photography />
        {/* FPV drone video (details in data/videos.ts) */}
        <FpvVideo />
        <Running />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
