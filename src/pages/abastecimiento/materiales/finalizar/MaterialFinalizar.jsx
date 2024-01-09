import { useState } from "react";
import { useSelector } from "react-redux";
import MaterialesTitle from "../MaterialesTitle";
import useR2Trazabilidad from "../../../../hooks/useR2andTrazabilidadData";
import DataTableMateriales from "../../../../components/DataTableMateriales";
import { ESTADO_DESPACHAR } from "../../../../components/estados_proceso";

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
  estado_pedido: ESTADO_DESPACHAR,
  categoria_item: "material",
};

const MaterialFinalizar = ({ user }) => {
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
        <MaterialesTitle etapa={"Confirmar entrega de solicitudes"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <MaterialesTitle etapa={"Confirmar entrega de solicitudes"} />
      <div className="flex mt-2 w-full flex-col">
        <DataTableMateriales
          data={registros}
          user={user}
          filter={body}
          columnsFilter={columnsFilter}
          dinamicState={dinamicState}
          setDinamicState={setDinamicState}
          resetState={resetState}
          setFilter={setBody}
        />
      </div>
    </div>
  );
};

export default MaterialFinalizar;
