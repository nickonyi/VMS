import { useEffect, useState } from "react";
import * as propertyApi from "../api/propertyApi";

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await propertyApi.getProperties();
        console.log(data);

        setProperties(data.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return {
    properties,
    loading,
    error,
  };
};
