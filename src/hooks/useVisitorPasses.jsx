import { useCallback, useEffect, useState } from "react";
import * as passApi from "../api/passApi";

export function useResidentPasses(residentId) {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
}

export const createPass = async (payload) => {
  return await passApi.createPass(payload);
};
