const API_URL = "http://localhost:3000/api/guard";

export const getVisitHistory = async () => {
  const res = await fetch(`${API_URL}/visit-logs`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch visit history.");
  }

  return data;
};

export const getPassByCode = async (code) => {
  const res = await fetch(`${API_URL}/verify?t=${encodeURIComponent(code)}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      ...data,
    };
  }

  return data;
};
