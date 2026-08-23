const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const API_ENDPOINTS = Object.freeze({
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    profile: "/auth/profile",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  users: {
    onboarding: "/users/onboarding",
    profile: "/users/profile",
    profileImage: "/users/profile/image",
  },
  interests: "/interests",
  dailyEmoji: {
    root: "/daily-emoji",
    mine: "/daily-emoji/mine",
    ofTheDay: "/daily-emoji/of-the-day",
  },
});

export async function apiRequest(path, options = {}) {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message || "Something went wrong";
    const error = new Error(message);
    error.status = response.status;
    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("loviqa:session-expired"));
    }
    throw error;
  }

  return data;
}

export function saveSession({ user }) {
  localStorage.setItem("loviqa_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("loviqa_user");
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem("loviqa_user");
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    clearSession();
    return null;
  }
}
