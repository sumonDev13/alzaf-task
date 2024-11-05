import Hero from "@/components/hero/Hero";
import BottomNav from "@/components/ui/BottomNav";
import TopNav from "@/components/ui/TopNav";

export default function Home() {
  return (
    <section>
      <TopNav/>
      <BottomNav/>
      <Hero/>
    </section>
  );
}
