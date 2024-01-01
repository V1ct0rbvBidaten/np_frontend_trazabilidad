import { useEffect, useState } from "react";
import { getGrupoArticulos } from "../api/r2";

function useGrupoArticulos(token, body, reload) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGrupoArticulos(token, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [body, reload]);

  return { data, loading, error };
}

export default useGrupoArticulos;
