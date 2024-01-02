import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { userLogin, getCurrentUser } from "../../api/auth";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [values, setValues] = useState(initialState);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { email, password } = values;

  //   const { user } = useSelector((state) => ({ ...state }));

  //   useEffect(() => {
  //     if (user && user.token) navigate("/");
  //   }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(import.meta.env.VITE_API_URL);
    userLogin({ email: email, contrasena: password })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);

        getCurrentUser({ token: res.data.access_token }).then((r) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              id: r.data.id,
              email: r.data.email,
              nombre_completo: r.data.nombre_completo,
              role: r.data.role,
              query: r.data.query,
              token: res.data.access_token,
            },
          });

          toast.success(`Inicio de sesión correcto`);

          setLoading(false);

          if (r.data.role === "admin") {
            navigate(`/abastecimiento/home`);
          } else if (r.data.role === "user") {
            navigate(`/user/mis-solicitudes`);
          }
          // else if (r.data.role === "user") {
          //     navigate(`/user/home`);
          //   }
        });
      })
      .catch((err) => {
        toast.error("No se ha podido iniciar sesión");
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className=" justify-center text-center">Iniciando Sesión...</div>
    );

  return (
    <>
      <Input
        type="email"
        variant="bordered"
        label="Correo"
        placeholder="example@bidaten.com"
        startContent={
          <EnvelopeIcon className="h-6 mt-2 text-default-400 pointer-events-none flex-shrink-0" />
        }
        className="max-w-xs mb-5"
        name="email"
        value={email}
        onChange={handleChange}
      />

      <Input
        label="Contraseña"
        variant="bordered"
        placeholder="Ingresa tu contraseña"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashIcon className="h-6 mt-2 text-default-400 pointer-events-none flex-shrink-0" />
            ) : (
              <EyeIcon className="h-6 mt-2 text-default-400 pointer-events-none flex-shrink-0" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs mb-5"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <Button
        onClick={handleSubmit}
        radius="full"
        className="w-80 bg-gradient-to-tr from-amber-300 to-amber-500 text-white shadow-lg"
      >
        Ingresar{" "}
      </Button>
    </>
  );
};

export default LoginForm;
