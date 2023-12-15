import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);

  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect
    count === 0 && navigate("/");
    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h3>Redireccionandote en {count} segundos</h3>
    </div>
  );
};

export default LoadingToRedirect;
