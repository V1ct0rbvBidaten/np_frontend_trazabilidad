import { useEffect, useState } from "react";
import { getUsers } from "../api/auth";

function useUsers(token, page, per_page, reload) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUsers(token, page, per_page)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page, per_page, reload]);

  return { data, loading, error };
}

export default useUsers;
