import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import VisualCases from "@/components/home/VisualCases";
import Testimonials from "@/components/home/Testimonials";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Services />
      <VisualCases />
      <Portfolio />
      <Testimonials />
    </main>
  );
}
