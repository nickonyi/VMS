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

      const response = await adminApi.getUsers();

      console.log(response.users);

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

export const updateProfile = async (id, updates) => {
  return await adminApi.updateProfile(id, updates);
};

export const createProfileViaSignup = async (data) => {
  return await adminApi.createUser(data);
};
