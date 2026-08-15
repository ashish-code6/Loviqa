"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheck,
  HiHeart,
  HiMapPin,
  HiSparkles,
} from "react-icons/hi2";
import BrandMark from "@/components/hero/ui/BrandMark";
import { apiRequest, clearSession, getStoredUser } from "@/lib/api";

const steps = ["About you", "Your interests", "A little more"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ age: "", gender: "", location: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const user = useMemo(() => getStoredUser(), []);

  useEffect(() => {
    if (!localStorage.getItem("loviqa_token")) {
      router.replace("/?auth=login");
      return;
    }

    Promise.all([apiRequest("/auth/profile"), apiRequest("/interests")])
      .then(([profileData, interestData]) => {
        if (profileData.onboardingComplete) {
          router.replace("/dashboard#profile");
          return;
        }
        setInterests(interestData);
      })
      .catch((requestError) => {
        clearSession();
        router.replace("/?auth=login");
        setError(requestError.message);
      })
      .finally(() => setLoading(false));
  }, [router]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleInterest(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((interestId) => interestId !== id)
        : current.length < 8 ? [...current, id] : current,
    );
  }

  function nextStep() {
    setError("");
    if (step === 0 && (!form.age || Number(form.age) < 18)) {
      setError("Please enter an age of 18 or above.");
      return;
    }
    if (step === 1 && selected.length === 0) {
      setError("Choose at least one interest to personalise your experience.");
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function finish() {
    setError("");
    setSaving(true);
    try {
      await apiRequest("/users/onboarding", {
        method: "POST",
        body: JSON.stringify({
          age: Number(form.age),
          gender: form.gender || undefined,
          location: form.location || undefined,
          bio: form.bio || undefined,
          interestIds: selected,
        }),
      });
      router.replace("/dashboard#profile");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-[#090611] text-sm font-semibold text-white/70">Preparing your profile…</main>;
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#090611] px-4 py-4 text-white sm:px-6 sm:py-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(124,58,237,.26),transparent_28%),radial-gradient(circle_at_84%_78%,rgba(236,72,153,.15),transparent_28%)]" />
      <div className="relative mx-auto max-w-5xl">
        <header className="flex items-center justify-between">
          <BrandMark />
          <p className="text-xs font-semibold text-white/55 sm:text-sm">Welcome, {user?.name || "there"}</p>
        </header>

        <section className="mx-auto mt-6 grid max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-[0_28px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:mt-10 sm:rounded-3xl lg:grid-cols-[.8fr_1.2fr]">
          <aside className="border-b border-white/10 bg-gradient-to-br from-violet-700/35 to-fuchsia-600/15 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-9">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-fuchsia-100"><HiSparkles className="h-6 w-6" /></span>
            <h1 className="mt-4 text-2xl font-black leading-tight sm:mt-5 sm:text-3xl">Make Loviqa feel like yours.</h1>
            <p className="mt-3 text-sm leading-6 text-white/65">A few details help us introduce you to people and communities you will genuinely enjoy.</p>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:mt-8 sm:grid sm:gap-3 sm:overflow-visible">
              {steps.map((label, index) => (
                <div key={label} className={`flex shrink-0 items-center gap-2 rounded-full px-2 py-1 text-xs font-bold sm:gap-3 sm:rounded-none sm:p-0 sm:text-sm ${index === step ? "bg-white/10 text-white sm:bg-transparent" : index < step ? "text-fuchsia-200" : "text-white/40"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full border sm:h-7 sm:w-7 ${index <= step ? "border-fuchsia-200/60 bg-fuchsia-300/15" : "border-white/15"}`}>{index < step ? <HiCheck /> : index + 1}</span>
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="p-5 sm:p-8 lg:p-9">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-fuchsia-200">Step {step + 1} of {steps.length}</p>
            {step === 0 && <AboutStep form={form} update={update} />}
            {step === 1 && <InterestStep interests={interests} selected={selected} toggle={toggleInterest} />}
            {step === 2 && <BioStep form={form} update={update} selectedCount={selected.length} />}
            {error && <p className="mt-5 rounded-xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</p>}
            <div className="mt-7 flex items-center justify-between gap-3 sm:mt-8 sm:gap-4">
              {step > 0 ? <button onClick={() => setStep((current) => current - 1)} className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition hover:text-white"><HiArrowLeft /> Back</button> : <span />}
              <button onClick={step === steps.length - 1 ? finish : nextStep} disabled={saving} className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 px-4 text-sm font-bold shadow-[0_12px_30px_rgba(192,38,211,.3)] transition hover:-translate-y-0.5 disabled:opacity-60 sm:px-5">
                {saving ? "Saving…" : step === steps.length - 1 ? "Complete profile" : "Continue"} <HiArrowRight />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AboutStep({ form, update }) {
  return <><h2 className="mt-3 text-2xl font-black">Tell us the basics</h2><p className="mt-2 text-sm leading-6 text-white/58">This information is only used to tailor your experience.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="Age" type="number" value={form.age} onChange={(value) => update("age", value)} placeholder="18+" /><label className="grid gap-2 text-sm font-semibold text-white/78">Identity <select value={form.gender} onChange={(event) => update("gender", event.target.value)} className="h-11 rounded-xl border border-white/12 bg-black/20 px-3 text-sm outline-none focus:border-fuchsia-300/55"><option value="">Prefer not to say</option><option>Woman</option><option>Man</option><option>Non-binary</option><option>Other</option></select></label></div></>;
}

function InterestStep({ interests, selected, toggle }) {
  return <><h2 className="mt-3 text-2xl font-black">What are you into?</h2><p className="mt-2 text-sm leading-6 text-white/58">Choose up to 8 interests. You can change these anytime.</p><div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">{interests.map((interest) => { const active = selected.includes(interest.id); return <button key={interest.id} onClick={() => toggle(interest.id)} className={`min-h-10 rounded-full border px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${active ? "border-fuchsia-300/60 bg-fuchsia-400/15 text-white" : "border-white/12 bg-white/[.035] text-white/65 hover:border-white/30 hover:text-white"}`}>{active && <HiCheck className="mr-1 inline h-4 w-4" />}{interest.name}</button>; })}</div></>;
}

function BioStep({ form, update, selectedCount }) {
  return <><h2 className="mt-3 text-2xl font-black">Add your personal touch</h2><p className="mt-2 text-sm leading-6 text-white/58">A location and a short introduction make your profile more welcoming.</p><div className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-semibold text-white/78">Location <span className="relative"><HiMapPin className="absolute left-3 top-3 h-5 w-5 text-fuchsia-200" /><input value={form.location} onChange={(event) => update("location", event.target.value)} className="h-11 w-full rounded-xl border border-white/12 bg-black/20 pl-10 pr-3 text-sm outline-none focus:border-fuchsia-300/55" placeholder="City, Country" /></span></label><label className="grid gap-2 text-sm font-semibold text-white/78">About you <textarea value={form.bio} onChange={(event) => update("bio", event.target.value)} maxLength={500} rows={4} className="resize-none rounded-xl border border-white/12 bg-black/20 p-3 text-sm outline-none focus:border-fuchsia-300/55" placeholder="Share a little about yourself, your vibe, or what you are looking for." /></label></div><div className="mt-5 flex items-center gap-2 text-sm text-white/55"><HiHeart className="text-rose-300" /> {selectedCount} interests will personalise your matches.</div></>;
}

function Field({ label, type, value, onChange, placeholder }) {
  return <label className="grid gap-2 text-sm font-semibold text-white/78">{label}<input type={type} min="18" max="100" value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-xl border border-white/12 bg-black/20 px-3 text-sm outline-none focus:border-fuchsia-300/55" placeholder={placeholder} /></label>;
}
