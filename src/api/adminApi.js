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

export const updateProfile = async (profileId, updates) => {
  const res = await fetch(`${API_URL}/${profileId}/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile.");
  }

  return data;
};

export const createUser = async (data) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to create user.");
  }

  return responseData;
};
