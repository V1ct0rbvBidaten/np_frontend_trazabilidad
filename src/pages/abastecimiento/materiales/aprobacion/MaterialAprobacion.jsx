import { useState } from "react";
import { useSelector } from "react-redux";
import MaterialesTitle from "../MaterialesTitle";
import useR2Trazabilidad from "../../../../hooks/useR2andTrazabilidadData";
import { ESTADO_EN_PROCESO } from "../../../../components/estados_proceso";
import DataTableMateriales from "../../../../components/DataTableMateriales";

const initialState = {
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

const initialDinamicState = {
  page: 1,
  per_page: 5,
  estado_pedido: ESTADO_EN_PROCESO,
  categoria_item: "material",
};

const MaterialAprobacion = ({ user }) => {
  const filter = useSelector((state) => state.filter);
  const columnsFilter = useSelector((state) => state.columns);

  const [body, setBody] = useState(initialState);
  const [dinamicState, setDinamicState] = useState(initialDinamicState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useR2Trazabilidad(
    user.token,
    filter,
    dinamicState,
    reload
  );

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
        <DataTableMateriales
          data={registros}
          filter={body}
          columnsFilter={columnsFilter}
          dinamicState={dinamicState}
          setDinamicState={setDinamicState}
          user={user}
          setFilter={setBody}
          resetState={resetState}
        />
      </div>
    </div>
  );
};

export default MaterialAprobacion;
