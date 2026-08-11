import { useCallback, useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi";

export function useVisitorPasses() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVisits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminApi.getVisitorPasses();
      setPasses(data.visits);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load visitor passes.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  return {
    passes,
    loading,
    error,
    reload: loadVisits,
  };
}

export const adminUpdatePass = () => {};
