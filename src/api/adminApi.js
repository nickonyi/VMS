const API_URL = "http://localhost:3000/api/admin";

export const getVisitorPasses = async () => {
  const res = await fetch(`${API_URL}/visitor-passes`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch visit history.");
  }

  return data;
};

export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/dashboard/stats`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dashboard statistics.");
  }

  return data;
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load users.");
  }

  return data;
};
