import { useState } from "react";
import MaterialesTitle from "../MaterialesTitle";
import GestionarTable from "./GestionarTable";
import useR2Data from "../../../../hooks/useR2Data";
import useR2pp from "../../../../hooks/useR2pp";

const initialState = {
  page: 1,
  per_page: 5,
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

  const { data: registros, loading } = useR2Data(user.token, body);

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
        <GestionarTable data={registros} filter={body} setFilter={setBody} />
      </div>
    </div>
  );
};

export default MaterialGestionar;
