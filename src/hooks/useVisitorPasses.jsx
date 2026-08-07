import { useCallback, useEffect, useState } from "react";
import * as passApi from "../api/passApi";

export function useResidentPasses() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await passApi.getMyVisitorPasses();

      setPasses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { passes, loading, error, reload: load };
}

export const createPass = async (payload) => {
  return await passApi.createPass(payload);
};

export const usePassByToken = (token) => {
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await passApi.getPassByToken(token);

      setPass(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

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

export const checkInPass = async (passId) => {
  return await passApi.checkInPass(passId);
};

export const checkOutPass = async (passId) => {
  return await passApi.checkOutPass(passId);
};
