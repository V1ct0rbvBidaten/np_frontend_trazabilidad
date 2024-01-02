import { useEffect, useState } from "react";
import { getR2Trazabilidad } from "../api/r2";

function useR2Trazabilidad(token, body, dinamicState, reload) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let values = body;

  values.page = dinamicState.page;
  values.per_page = dinamicState.per_page;
  values.categoria_item = dinamicState.categoria_item;
  values.estado_pedido = dinamicState.estado_pedido;

  useEffect(() => {
    setLoading(true);
    getR2Trazabilidad(token, values)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [body, dinamicState, reload]);

  return { data, loading, error };
}

export default useR2Trazabilidad;
