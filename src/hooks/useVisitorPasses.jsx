import { useCallback, useEffect, useState } from "react";

export function useResidentPasses(residentId) {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
}
