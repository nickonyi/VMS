import { api } from "./client";

export const signin = (phone, password) => {
  return api("/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      phone,
      password,
    }),
  });
};

export const signup = (fullName, phone, password) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ fullName, phone, password }),
  });
};

export const signout = () => {
  return api("/auth/signout", {
    method: "POST",
  });
};
