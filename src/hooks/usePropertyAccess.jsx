import { useState } from "react";
import { requestPropertyAccess } from "../api/propertyApi";

export function usePropertyAccess() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestAccess = async (propertyId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestPropertyAccess(propertyId);

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to request access.";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    requestAccess,
    loading,
    error,
  };
}
