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

export const checkInPass = async (passId) => {
  return await residentApi.checkInPass(passId);
};

export const checkOutPass = async (passId) => {
  return await residentApi.checkOutPass(passId);
};

export const cancelPass = async (passId) => {
  return await residentApi.cancelPass(passId);
};
