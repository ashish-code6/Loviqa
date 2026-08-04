import { HiArrowRight, HiPlay } from "react-icons/hi2";
import AuthActionButton from "@/components/AuthActionButton";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <AuthActionButton
        mode="register"
        className="inline-flex min-h-14 items-center gap-7 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-300 px-10 text-base font-bold text-white shadow-[0_18px_42px_rgba(168,85,247,0.34)] transition hover:-translate-y-0.5"
      >
        Get Started
        <HiArrowRight className="h-6 w-6" />
      </AuthActionButton>
      <a
        href="#features"
        className="inline-flex min-h-14 items-center gap-7 rounded-xl border border-white/18 bg-white/[0.025] px-8 text-base font-bold text-white/90 backdrop-blur-xl transition hover:border-fuchsia-300/50 hover:bg-white/[0.06]"
      >
        Explore Loviqa
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.08]">
          <HiPlay className="h-4 w-4 text-fuchsia-200" />
        </span>
      </a>
    </div>
  );
}
