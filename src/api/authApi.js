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

export const signup = (user) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const signout = () => {
  return api("/auth/signout", {
    method: "POST",
  });
};
