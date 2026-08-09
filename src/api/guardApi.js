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

export const checkInPass = async (passId) => {
  const res = await fetch(`${API_URL}/${passId}/check-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Check-in failed.");
  }

  return data;
};

export const checkOutPass = async (passId) => {
  const res = await fetch(`${API_URL}/${passId}/check-out`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Check-out failed.");
  }

  return data;
};
