import { useCallback, useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi";

export function useVisitorPasses() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVisits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminApi.getVisitorPasses();
      setVisits(data.visits);
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
    visits,
    loading,
    error,
    reload: loadVisits,
  };
}

export const adminUpdatePass = () => {};
