const API_URL = import.meta.env.VITE_DEV_API_URL;

export const createPass = async (payload) => {
  const res = await fetch(`${API_URL}/api/resident`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    let message = "Failed to create visitor pass.";

    if (data.message) {
      message = data.message;
    } else if (data.errors) {
      message = Object.values(data.errors)[0];
    }

    throw new Error(message);
  }

  return data;
};

export const getVisitorPass = async (passId) => {
  const res = await fetch(`${API_URL}/api/resident/${passId}`, {
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

export const getMyVisitorPasses = async () => {
  const res = await fetch(`${API_URL}/api/resident/my-passes`, {
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

export const cancelPass = async (passId) => {
  const res = await fetch(`${API_URL}/api/resident/${passId}/cancel`, {
    method: "PATCH",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel visitor pass.");
  }

  return data;
};
