import { useCallback, useEffect, useState } from "react";
import * as adminApi from "@/api/adminApi.js";

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(adminApi);

      const response = await adminApi.getUsers();
      console.log(response);

      setProfiles(response.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    profiles,
    loading,
    error,
    reload: load,
  };
}
