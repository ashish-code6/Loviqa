"use client";

import Link from "next/link";
import { useState } from "react";
import { HiArrowRight, HiCheckCircle, HiEnvelope } from "react-icons/hi2";
import BrandMark from "@/components/hero/ui/BrandMark";
import { apiRequest } from "@/lib/api";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      setMessage(data.message);
      toast.success("If the account exists, a reset email is on its way.");
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return <AuthShell><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-400/12 text-fuchsia-100"><HiEnvelope className="h-6 w-6" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-fuchsia-200">Account recovery</p><h1 className="mt-2 text-3xl font-black">Reset your password</h1><p className="mt-3 text-sm leading-6 text-white/60">Enter the email connected to your account and we will send a secure reset link.</p>{message ? <div className="mt-6 rounded-xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50"><HiCheckCircle className="mr-2 inline h-5 w-5" />{message}</div> : <form onSubmit={submit} className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-semibold text-white/80">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border border-white/12 bg-black/20 px-4 text-white outline-none focus:border-fuchsia-300/60" placeholder="you@example.com" /></label>{error && <p className="text-sm text-rose-200">{error}</p>}<button disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 text-sm font-bold transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? <><LoadingSpinner /> Sending…</> : <>Send reset link<HiArrowRight /></>}</button></form>}<Link href="/?auth=login" className="mt-7 inline-block text-sm font-bold text-white/60 transition hover:text-white">← Back to login</Link></AuthShell>;
}

function AuthShell({ children }) {
  return <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-[#090611] px-5 text-white"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(124,58,237,.26),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(236,72,153,.16),transparent_30%)]" /><section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[.055] p-7 shadow-[0_28px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl"><BrandMark />{children}</section></main>;
}
