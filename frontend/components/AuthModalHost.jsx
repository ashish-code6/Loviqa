"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiCheckCircle,
  HiExclamationTriangle,
  HiXMark,
} from "react-icons/hi2";
import { API_ENDPOINTS, apiRequest, saveSession } from "@/lib/api";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
        const data = await apiRequest(API_ENDPOINTS.auth.login, {
          method: "POST",
          body: JSON.stringify(forms.login),
        });
        saveSession(data);
        sessionStorage.setItem("loviqa:show-daily-emoji", "true");
        toast.success("Welcome back to Loviqa!");
        router.push(data.onboardingComplete ? "/dashboard" : "/onboarding");
        return;
      }

      await apiRequest(API_ENDPOINTS.auth.register, {
        method: "POST",
        body: JSON.stringify(forms.register),
      });

      const data = await apiRequest(API_ENDPOINTS.auth.login, {
        method: "POST",
        body: JSON.stringify({
          email: forms.register.email,
          password: forms.register.password,
        }),
      });
      saveSession(data);
      sessionStorage.setItem("loviqa:show-daily-emoji", "true");
      toast.success("Account created. Let's personalise your profile.");
      router.push(data.onboardingComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!mode) return null;

  const isLogin = mode === "login";
  const form = forms[mode];

  return (
    <div className="no-scrollbar fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-3 pb-12 pt-5 backdrop-blur-md sm:items-center sm:px-5 sm:py-8">
      <section className="no-scrollbar relative w-full max-w-md max-h-[calc(100svh-4rem)] overflow-y-auto rounded-2xl border border-white/12 bg-[#080b16] p-3.5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.65)] sm:max-h-[calc(100dvh-4rem)] sm:rounded-3xl sm:p-7">
        <button
          type="button"
          aria-label="Close"
          onClick={closeModal}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 text-white/72 transition hover:bg-white/[0.06] hover:text-white sm:h-10 sm:w-10"
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <p className="pr-10 text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-200 sm:text-sm sm:tracking-normal">
          {isLogin ? "Login" : "Register"}
        </p>
        <h2 className="mt-1.5 text-2xl font-black sm:mt-2 sm:text-3xl">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>
        <p className="mt-1.5 hidden max-w-sm text-sm leading-5 text-white/62 sm:block sm:mt-2 sm:leading-6">
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

        <form onSubmit={handleSubmit} className="mt-3 grid gap-2 sm:mt-6 sm:gap-4">
          {!isLogin && (
            <label className="grid gap-1.5 text-xs font-semibold text-white/84 sm:gap-2 sm:text-sm">
              Name
              <input
                required
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                className="h-10 rounded-xl border border-white/14 bg-black/25 px-3 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55 sm:h-12 sm:px-4"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="grid gap-1.5 text-xs font-semibold text-white/84 sm:gap-2 sm:text-sm">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
              className="h-10 rounded-xl border border-white/14 bg-black/25 px-3 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55 sm:h-12 sm:px-4"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-white/84 sm:gap-2 sm:text-sm">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(event) => updateForm("password", event.target.value)}
              className="h-10 rounded-xl border border-white/14 bg-black/25 px-3 text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-300/55 sm:h-12 sm:px-4"
              placeholder="Minimum 6 characters"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex h-9 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-300 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65 sm:mt-2 sm:h-12"
          >
            {loading ? <><LoadingSpinner /> Please wait…</> : <>{isLogin ? "Login" : "Register"}<HiArrowRight className="h-5 w-5" /></>}
          </button>
        </form>

        {isLogin && (
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="mt-2 min-h-8 text-left text-sm font-semibold text-fuchsia-200 transition hover:text-white sm:mt-4 sm:min-h-10"
          >
            Forgot your password?
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setMessage({ type: "", text: "" });
            setMode(isLogin ? "register" : "login");
          }}
          className="mt-2 w-full py-1 text-center text-sm text-white/62 sm:mt-6 sm:py-2"
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
