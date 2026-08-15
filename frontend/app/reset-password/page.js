"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiCheckCircle, HiLockClosed } from "react-icons/hi2";
import BrandMark from "@/components/hero/ui/BrandMark";
import { apiRequest } from "@/lib/api";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (!token) return setError("This reset link is missing or invalid.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true); setError("");
    try { const data = await apiRequest("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) }); setMessage(data.message); toast.success("Password updated successfully."); } catch (requestError) { setError(requestError.message); toast.error(requestError.message); } finally { setLoading(false); }
  }

  return <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-[#090611] px-5 text-white"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(124,58,237,.26),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(236,72,153,.16),transparent_30%)]" /><section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[.055] p-7 shadow-[0_28px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl"><BrandMark /><div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-400/12 text-fuchsia-100"><HiLockClosed className="h-6 w-6" /></div><h1 className="mt-5 text-3xl font-black">Choose a new password</h1><p className="mt-3 text-sm leading-6 text-white/60">Use at least 6 characters and do not reuse an old password.</p>{message ? <div className="mt-6 rounded-xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm text-emerald-50"><HiCheckCircle className="mr-2 inline h-5 w-5" />{message}<Link href="/?auth=login" className="mt-3 block font-bold underline">Go to login</Link></div> : <form onSubmit={submit} className="mt-7 grid gap-4"><PasswordField label="New password" value={password} onChange={setPassword} /><PasswordField label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} />{error && <p className="text-sm text-rose-200">{error}</p>}<button disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 text-sm font-bold transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? <><LoadingSpinner /> Saving…</> : "Update password"}</button></form>}</section></main>;
}

function PasswordField({ label, value, onChange }) { return <label className="grid gap-2 text-sm font-semibold text-white/80">{label}<input required minLength={6} type="password" value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-xl border border-white/12 bg-black/20 px-4 text-white outline-none focus:border-fuchsia-300/60" placeholder="At least 6 characters" /></label>; }
