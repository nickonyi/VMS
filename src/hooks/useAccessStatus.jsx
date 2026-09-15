import { useState } from "react";
import { checkPropertyAccess } from "../api/propertyApi";

export const useAccessStatus = () => {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);

  const checkAccess = async () => {
    setChecking(true);
    setError(null);

    try {
      const result = await checkPropertyAccess();

      return {
        success: true,
        hasAccess: result.hasAccess,
        data: result,
      };
    } catch (err) {
      setError(err.message);

      return {
        success: false,
        hasAccess: false,
        error: err.message,
      };
    } finally {
      setChecking(false);
    }
  };

  return {
    checkAccess,
    checking,
    error,
  };
};
