import { useState } from "react";
import { useSelector } from "react-redux";
import MaterialesTitle from "../MaterialesTitle";
import useR2Trazabilidad from "../../../../hooks/useR2andTrazabilidadData";
import DataTableMateriales from "../../../../components/DataTableMateriales";
import { ESTADO_EN_APROBACION_APROBADA } from "../../../../components/estados_proceso";

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

  estado_pedido: ESTADO_EN_APROBACION_APROBADA,
};

const MaterialDespachar = ({ user }) => {
  const filter = useSelector((state) => state.filter);
  const [body, setBody] = useState(initialState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  filter.estado_pedido = body.estado_pedido;

  const { data: registros, loading } = useR2Trazabilidad(
    user.token,
    filter,
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
        <DataTableMateriales
          data={registros}
          filter={filter}
          setFilter={setBody}
          resetState={resetState}
          user={user}
        />
      </div>
    </div>
  );
};

export default MaterialDespachar;
