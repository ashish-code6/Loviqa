const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function apiRequest(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("loviqa_token") : null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message || "Something went wrong";
    throw new Error(message);
  }

  return data;
}

export function saveSession({ accessToken, user }) {
  localStorage.setItem("loviqa_token", accessToken);
  localStorage.setItem("loviqa_user", JSON.stringify(user));
  document.cookie = `loviqa_token=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearSession() {
  localStorage.removeItem("loviqa_token");
  localStorage.removeItem("loviqa_user");
  document.cookie = "loviqa_token=; path=/; max-age=0; SameSite=Lax";
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
