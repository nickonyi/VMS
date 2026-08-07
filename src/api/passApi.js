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
  const res = await fetch(`${API_URL}/${passId}`, {
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
