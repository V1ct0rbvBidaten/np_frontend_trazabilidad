import { useState } from "react";
import MaterialesTitle from "../MaterialesTitle";
import { useSelector } from "react-redux";
import useR2Data from "../../../../hooks/useR2Data";
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
  categoria_item: "material",
};
const MaterialGestionar = ({ user }) => {
  const filter = useSelector((state) => state.filter);
  const columnsFilter = useSelector((state) => state.columns);
  const [body, setBody] = useState(initialState);
  const [dinamicState, setDinamicState] = useState(initialDinamicState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useR2Data(
    user.token,
    filter,
    dinamicState,
    reload
  );

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
        <DataTableMateriales
          data={registros}
          columnsFilter={columnsFilter}
          filter={body}
          dinamicState={dinamicState}
          setDinamicState={setDinamicState}
          setFilter={setBody}
          user={user}
          resetState={resetState}
        />
      </div>
    </div>
  );
};

export default MaterialGestionar;
