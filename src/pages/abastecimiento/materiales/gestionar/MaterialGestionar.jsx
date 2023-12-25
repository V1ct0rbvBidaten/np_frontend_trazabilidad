import { useState } from "react";
import MaterialesTitle from "../MaterialesTitle";
import GestionarTable from "./GestionarTable";
import useR2Data from "../../../../hooks/useR2Data";

const initialState = {
  page: 1,
  per_page: 10,
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  categoria_item: "material",
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

const MaterialGestionar = ({ user }) => {
  const [body, setBody] = useState(initialState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useR2Data(user.token, body, reload);

  if (loading)
    return (
      <div>
        <MaterialesTitle etapa={"Solicitudes a gestionar"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <MaterialesTitle etapa={"Solicitudes a gestionar"} />

      <div className="flex mt-2 w-full flex-col">
        <GestionarTable
          data={registros}
          filter={body}
          setFilter={setBody}
          resetState={resetState}
        />
      </div>
    </div>
  );
};

export default MaterialGestionar;
