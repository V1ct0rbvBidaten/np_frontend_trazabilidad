import { useEffect, useState } from "react";
import { getR2Trazabilidad } from "../api/r2";

function useR2Trazabilidad(token, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getR2Trazabilidad(token, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [body]);

  return { data, loading, error };
}

export default useR2Trazabilidad;
