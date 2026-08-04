"use client";

import { motion } from "framer-motion";
import {
  HiHeart,
  HiOutlineBookOpen,
  HiOutlinePuzzlePiece,
  HiOutlineMusicalNote,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import HeroCanvas from "./HeroCanvas";
import HeroActions from "./hero/ui/HeroActions";
import HeroBadge from "./hero/ui/HeroBadge";
import HeroStats from "./hero/ui/HeroStats";
import MatchCard from "./hero/ui/MatchCard";
import { matchCards } from "./hero/data/heroContent";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#03020a] px-5 pb-6 pt-24 text-white lg:px-11 lg:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_38%,rgba(126,34,206,0.34),transparent_30%),radial-gradient(circle_at_45%_45%,rgba(217,70,239,0.12),transparent_34%),radial-gradient(circle_at_14%_42%,rgba(88,28,135,0.18),transparent_38%),linear-gradient(90deg,#020109_0%,#05020d_42%,#070214_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,transparent_0%,rgba(3,2,10,0.08)_34%,rgba(3,2,10,0.5)_100%)]" />
      <div className="absolute inset-x-[-10%] bottom-24 h-28 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.32),transparent_64%)] blur-2xl" />
      <div className="absolute inset-x-[-12%] bottom-20 h-36 rotate-[-2deg] opacity-45 [background:repeating-radial-gradient(ellipse_at_center,rgba(217,70,239,0.38)_0_1px,transparent_1px_15px)] [mask-image:linear-gradient(to_right,transparent,black_24%,black_76%,transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-56 opacity-60 [background-image:radial-gradient(circle,rgba(217,70,239,0.82)_1px,transparent_1.4px)] [background-size:17px_17px] [mask-image:linear-gradient(to_top,black,transparent)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid min-h-[calc(100vh-6.5rem)] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-[590px] pt-4 lg:pt-0"
          >
            <HeroBadge />

            <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-normal text-white sm:text-6xl xl:text-[66px]">
              Find Meaningful Connections,
              <span className="block bg-gradient-to-r from-white via-fuchsia-200 to-fuchsia-500 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-lg leading-8 text-white/68">
              Loviqa helps you meet compatible people through shared interests,
              smart matchmaking, and meaningful conversations.
            </p>

            <div className="mt-8">
              <HeroActions />
            </div>

            <div className="mt-12">
              <HeroStats />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="relative hidden min-h-[560px] lg:block"
          >
            <div className="absolute left-[52%] top-1/2 h-[540px] w-[720px] max-w-full -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-[-10%] bg-[radial-gradient(circle,rgba(217,70,239,0.16),transparent_62%)] blur-2xl" />
              <div className="absolute inset-0">
                <HeroCanvas />
              </div>
              <div className="absolute left-[52%] top-[48%] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fuchsia-500/[0.04] text-fuchsia-300 drop-shadow-[0_0_22px_rgba(217,70,239,0.9)]">
                <HiHeart className="h-20 w-20 stroke-[1.1]" />
              </div>
              {matchCards.map((card) => (
                <MatchCard key={card.name} card={card} />
              ))}
              <FloatingIcon className="left-[10%] top-[50%]" icon={HiOutlinePaperAirplane} />
              <FloatingIcon className="left-[56%] top-[5%]" icon={HiOutlineMusicalNote} />
              <FloatingIcon className="right-[1%] top-[43%]" icon={HiOutlinePuzzlePiece} />
              <FloatingIcon className="bottom-[5%] left-[60%]" icon={HiOutlineBookOpen} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingIcon({ icon: Icon, className }) {
  return (
    <div
      className={`absolute hidden h-16 w-16 items-center justify-center rounded-full border border-fuchsia-300/28 bg-fuchsia-500/[0.16] text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.4)] backdrop-blur-xl lg:flex ${className}`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
