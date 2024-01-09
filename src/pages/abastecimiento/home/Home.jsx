import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { useSelector } from "react-redux";

import { useState } from "react";
import useR2Trazabilidad from "../../../hooks/useR2andTrazabilidadData";
import DataTableMateriales from "../../../components/DataTableMateriales";

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
};

const Home = ({ user }) => {
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
        <Card className="w-full">
          <CardHeader className="flex gap-3 p-4">
            <div className="flex flex-col">
              <p className="text-2xl">Resumen de solicitudes</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-stone-400">
              Resumen de solicitudes de pedimentos
            </p>
          </CardBody>
        </Card>

        <div className="flex mt-5 w-full flex-col">Cargando</div>
      </div>
    );

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex gap-3 p-4">
          <div className="flex flex-col">
            <p className="text-2xl">Resumen de solicitudes</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-stone-400">Resumen de solicitudes de pedimentos</p>
        </CardBody>
      </Card>

      <div className="flex mt-5 w-full flex-col">
        <DataTableMateriales
          data={registros}
          user={user}
          columnsFilter={columnsFilter}
          dinamicState={dinamicState}
          setDinamicState={setDinamicState}
          resetState={resetState}
          filter={body}
          setFilter={setBody}
        />
      </div>
    </div>
  );
};

export default Home;
