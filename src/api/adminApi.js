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

  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dashboard statistics.");
  }

  return data;
};
