import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
    </main>
  );
}
