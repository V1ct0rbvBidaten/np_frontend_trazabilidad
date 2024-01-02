import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { renderRoutes } from "./routes";

import { getCurrentUser } from "./api/auth";
import { useDispatch } from "react-redux";

import AdminRoute from "./components/routes/Adminroute";
import Home from "./pages/abastecimiento/home/Home";
import Login from "./pages/Login";
import MaterialGestionar from "./pages/abastecimiento/materiales/gestionar/MaterialGestionar";
import MaterialAprobacion from "./pages/abastecimiento/materiales/aprobacion/MaterialAprobacion";
import MaterialDespachar from "./pages/abastecimiento/materiales/despachar/MaterialDespachar";
import MaterialFinalizar from "./pages/abastecimiento/materiales/finalizar/MaterialFinalizar";

import ServiciosAprobacion from "./pages/abastecimiento/servicios/aprobacion/ServiciosAprobacion";

import ServiciosFinalizar from "./pages/abastecimiento/servicios/finalizar/ServiciosFinalizar";
import UsersList from "./pages/abastecimiento/configuraciones/UsersList";
import HomeUser from "./pages/solicitantes/home/HomeUser";
import UserRoute from "./components/routes/UserRoute";
import MaterialCotizando from "./pages/abastecimiento/materiales/cotizando/MaterialCotizando";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (token !== null) {
        getCurrentUser({ token: localStorage.getItem("token") })
          .then((r) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                id: r.data.id,
                email: r.data.email,
                nombre_completo: r.data.nombre_completo,
                role: r.data.role,
                query: r.data.query,
                token: localStorage.getItem("token"),
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    checkUser();
  }, [dispatch]);

  return (
    <div className="h-max flex flex-col justify-between">
      <ToastContainer />

      <div className="flex-1 overflow-y-scroll">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/abastecimiento/home"
            element={<AdminRoute Component={Home} />}
          />
          <Route
            exact
            path="/abastecimiento/materiales/gestionar"
            element={<AdminRoute Component={MaterialGestionar} />}
          />
          <Route
            exact
            path="/abastecimiento/materiales/cotizando"
            element={<AdminRoute Component={MaterialCotizando} />}
          />
          <Route
            exact
            path="/abastecimiento/materiales/aprobacion"
            element={<AdminRoute Component={MaterialAprobacion} />}
          />{" "}
          <Route
            exact
            path="/abastecimiento/materiales/despachar"
            element={<AdminRoute Component={MaterialDespachar} />}
          />
          <Route
            exact
            path="/abastecimiento/materiales/finalizar"
            element={<AdminRoute Component={MaterialFinalizar} />}
          />
          <Route
            exact
            path="/abastecimiento/servicios/aprobacion"
            element={<AdminRoute Component={ServiciosAprobacion} />}
          />
          <Route
            exact
            path="/abastecimiento/servicios/finalizar"
            element={<AdminRoute Component={ServiciosFinalizar} />}
          />
          <Route
            exact
            path="/abastecimiento/configuracion/usuarios"
            element={<AdminRoute Component={UsersList} />}
          />
          <Route
            exact
            path="/user/mis-solicitudes"
            element={<UserRoute Component={HomeUser} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
