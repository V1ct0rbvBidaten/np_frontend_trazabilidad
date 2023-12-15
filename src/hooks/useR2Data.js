import { useEffect, useState } from "react";
import { getSolicitudesNoGestionadas } from "../api/r2";

function useR2Data(token, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSolicitudesNoGestionadas(token, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [body]);

  return { data, loading, error };
}

export default useR2Data;
