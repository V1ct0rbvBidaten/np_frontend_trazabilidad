import { useState } from "react";
import MaterialesTitle from "../MaterialesTitle";
import AprobacionTable from "./AprobacionTable";
import useR2Trazabilidad from "../../../../hooks/useR2andTrazabilidadData";

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
  estado_pedido: "En proceso",
};

const MaterialAprobacion = ({ user }) => {
  const [body, setBody] = useState(initialState);

  const { data: registros, loading } = useR2Trazabilidad(user.token, body);

  if (loading)
    return (
      <div>
        <MaterialesTitle etapa={"Solicitudes en proceso de aprobación"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <MaterialesTitle etapa={"Solicitudes en proceso de aprobación"} />

      <div className="flex mt-2 w-full flex-col">
        <AprobacionTable data={registros} filter={body} setFilter={setBody} />
      </div>
    </div>
  );
};

export default MaterialAprobacion;
