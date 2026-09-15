import { api } from "./client";

export const signin = (email, password) => {
  return api("/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      email,
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
