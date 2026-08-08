import { useCallback, useEffect, useState } from "react";
import * as residentApi from "../api/residentApi";

export function useResidentPasses() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await residentApi.getMyVisitorPasses();

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

  console.log(passes);

  return { passes, loading, error, reload: load };
}

export const createPass = async (payload) => {
  return await residentApi.createPass(payload);
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

      const response = await residentApi.getPassByToken(token);

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
  return await residentApi.checkInPass(passId);
};

export const checkOutPass = async (passId) => {
  return await residentApi.checkOutPass(passId);
};

export const cancelPass = async (passId) => {
  return await residentApi.cancelPass(passId);
};
