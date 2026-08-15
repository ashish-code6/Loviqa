"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiCheckCircle,
  HiExclamationTriangle,
  HiXMark,
} from "react-icons/hi2";
import { apiRequest, saveSession } from "@/lib/api";

const emptyForms = {
  login: { email: "", password: "" },
  register: { name: "", email: "", password: "" },
};

export default function AuthModalHost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("auth");
  const [mode, setMode] = useState(() =>
    initialMode === "login" || initialMode === "register" ? initialMode : null,
  );
  const [forms, setForms] = useState(emptyForms);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleOpen(event) {
      setMessage({ type: "", text: "" });
      setMode(event.detail?.mode === "register" ? "register" : "login");
    }

    window.addEventListener("loviqa:auth", handleOpen);
    return () => window.removeEventListener("loviqa:auth", handleOpen);
  }, []);

  function updateForm(field, value) {
    setForms((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [field]: value,
      },
    }));
  }

  function closeModal() {
    setMode(null);
    setMessage({ type: "", text: "" });
    if (searchParams.get("auth")) {
      router.replace("/");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      if (mode === "login") {
        const data = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify(forms.login),
        });
        saveSession(data);
        router.push(data.onboardingComplete ? "/dashboard" : "/onboarding");
        return;
      }

      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(forms.register),
      });

      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: forms.register.email,
          password: forms.register.password,
        }),
      });
      saveSession(data);
      router.push(data.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }

  if (!mode) return null;

  const isLogin = mode === "login";
  const form = forms[mode];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-md">
      <section className="relative w-full max-w-md rounded-lg border border-white/12 bg-[#080b16] p-7 text-white shadow-[0_24px_90px_rgba(0,0,0,0.65)]">
        <button
          type="button"
          aria-label="Close"
          onClick={closeModal}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-white/72 transition hover:bg-white/[0.06] hover:text-white"
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <p className="text-sm font-bold uppercase tracking-normal text-fuchsia-200">
          {isLogin ? "Login" : "Register"}
        </p>
        <h2 className="mt-2 text-3xl font-black">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/62">
          {isLogin
            ? "Login to open your main dashboard."
            : "Register first, then login to unlock your dashboard."}
        </p>

        {message.text && (
          <div
            className={`mt-5 flex gap-3 rounded-lg border p-3 text-sm ${
              message.type === "error"
                ? "border-red-400/30 bg-red-500/10 text-red-100"
                : "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
            }`}
          >
            {message.type === "error" ? (
              <HiExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {!isLogin && (
            <label className="grid gap-2 text-sm font-semibold text-white/84">
              Name
              <input
                required
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                className="h-12 rounded-lg border border-white/14 bg-black/25 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="grid gap-2 text-sm font-semibold text-white/84">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
              className="h-12 rounded-lg border border-white/14 bg-black/25 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-white/84">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(event) => updateForm("password", event.target.value)}
              className="h-12 rounded-lg border border-white/14 bg-black/25 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55"
              placeholder="Minimum 6 characters"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-300 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            <HiArrowRight className="h-5 w-5" />
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMessage({ type: "", text: "" });
            setMode(isLogin ? "register" : "login");
          }}
          className="mt-6 w-full text-center text-sm text-white/62"
        >
          {isLogin ? "New here? " : "Already have an account? "}
          <span className="font-bold text-fuchsia-200">
            {isLogin ? "Create an account" : "Login"}
          </span>
        </button>
      </section>
    </div>
  );
}
