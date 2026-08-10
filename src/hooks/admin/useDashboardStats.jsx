import { useCallback, useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi";

export function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await adminApi.getDashboardStats();

      setStats(data.stats);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard statistics.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    reload: loadStats,
  };
}
