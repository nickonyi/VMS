import { useCallback, useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi";

export function useVisitorPasses() {
  const [passes, setPasses] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [status, setStatusState] = useState("all");
  const [search, setSearchState] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminApi.getVisitorPasses({
        page: pagination.page,
        limit: pagination.limit,
        status,
        search,
      });

      setPasses(response.passes ?? []);
      setPagination(
        response.pagination ?? {
          page: pagination.page,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
        },
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load visitor passes.",
      );
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, status, search]);

  useEffect(() => {
    load();
  }, [load]);

  const goToPage = useCallback((newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const setStatus = useCallback((newStatus) => {
    setStatusState(newStatus);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  const setSearch = useCallback((newSearch) => {
    setSearchState(newSearch);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  return {
    passes,
    pagination,
    status,
    search,
    loading,
    error,
    setStatus,
    setSearch,
    goToPage,
    reload: load,
  };
}

export const adminUpdatePass = async (id, updates) => {
  return adminApi.updateVisitorPass(id, updates);
};
