const API_URL = "http://localhost:3000/api/passes";

export const createPass = async (payload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create visitor pass.");
  }

  return data;
};
