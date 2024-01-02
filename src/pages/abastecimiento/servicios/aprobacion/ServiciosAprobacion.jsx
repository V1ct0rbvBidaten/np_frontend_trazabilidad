import { useState } from "react";
import { useSelector } from "react-redux";
import ServiciosTitle from "../ServiciosTitle";
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
  per_page: 10,
  categoria_item: "servicio",
};

const ServiciosAprobacion = ({ user }) => {
  const filter = useSelector((state) => state.filter);

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
        <ServiciosTitle etapa={"Solicitudes en proceso de aprobación"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <ServiciosTitle etapa={"Solicitudes en proceso de aprobación"} />

      <div className="flex mt-2 w-full flex-col">
        <DataTableMateriales
          data={registros}
          filter={body}
          dinamicState={dinamicState}
          setDinamicState={setDinamicState}
          resetState={resetState}
          user={user}
          setFilter={setBody}
        />
      </div>
    </div>
  );
};

export default ServiciosAprobacion;
