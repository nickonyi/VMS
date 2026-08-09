import { useCallback, useEffect, useState } from "react";
import * as guardApi from "../../api/guardApi";

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

export const usePassByManualCode = (code) => {
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!code) return;

    try {
      setLoading(true);
      setError(null);

      const response = await guardApi.getPassByCode(code);

      setPass(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    pass,
    loading,
    error,
    reload: load,
  };
};
