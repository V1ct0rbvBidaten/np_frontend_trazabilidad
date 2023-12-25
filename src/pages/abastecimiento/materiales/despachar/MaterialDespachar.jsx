import { useState } from "react";
import MaterialesTitle from "../MaterialesTitle";
import DespacharTable from "./DespacharTable";
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

  estado_pedido: "Aprobada",
};

const MaterialDespachar = ({ user }) => {
  const [body, setBody] = useState(initialState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useR2Trazabilidad(
    user.token,
    body,
    reload
  );

  if (loading)
    return (
      <div>
        <MaterialesTitle etapa={"Despachar solicitudes"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <MaterialesTitle etapa={"Despachar solicitudes"} />

      <div className="flex mt-2 w-full flex-col">
        <DespacharTable
          data={registros}
          filter={body}
          setFilter={setBody}
          resetState={resetState}
        />
      </div>
    </div>
  );
};

export default MaterialDespachar;
