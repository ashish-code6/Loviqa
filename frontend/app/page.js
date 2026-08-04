import { Suspense } from "react";
import AuthModalHost from "@/components/AuthModalHost";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InterestClubSection from "@/components/InterestClubSection";
import Navbar from "@/components/Navbar";
import AIMatchSection from "@/components/sections/AIMatchSection";
import StatsSection from "@/components/sections/StatsSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14]">
      <Navbar />
      <Suspense fallback={null}>
        <AuthModalHost />
      </Suspense>
      <Hero/>
      <StatsSection/>
      <AIMatchSection/>
      <InterestClubSection/>
      <FAQSection/>
      <Footer/>
      
    </main>
  );
}
