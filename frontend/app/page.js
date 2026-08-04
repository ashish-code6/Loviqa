import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14]">
      <Navbar />
      <Hero/>
    </main>
  );
}