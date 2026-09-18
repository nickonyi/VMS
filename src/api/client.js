const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = Object.values(data.errors || {})[0] || data.message;
    throw new Error(errorMessage || "Something went wrong.");
  }

  return data;
};
