import { api } from "./client";

export const getProperties = async () => {
  return api("/properties", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
};

export const requestPropertyAccess = async (propertyId) => {
  return api(`/properties/${propertyId}/access`, {
    method: "POST",
  });
};

export const checkPropertyAccess = async () => {
  return api("/properties/access", {
    method: "GET",
  });
};
