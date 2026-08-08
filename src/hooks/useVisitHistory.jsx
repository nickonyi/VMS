import { useCallback, useEffect, useState } from "react";
import * as guardApi from "../api/guardApi";

export function useVisitHistory() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await guardApi.getVisitHistory();

      setVisits(data.visits);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load visit history.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    visits,
    loading,
    error,
    reload: loadHistory,
  };
}
