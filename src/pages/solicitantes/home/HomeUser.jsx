import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import DataTableMateriales from "../../../components/DataTableMateriales";
import { useState } from "react";
import { useSelector } from "react-redux";
import useR2Trazabilidad from "../../../hooks/useR2andTrazabilidadData";

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

const HomeUser = ({ user, userQuery }) => {
  const filter = useSelector((state) => state.filter);
  const columnsFilter = useSelector((state) => state.columns);

  // const userQuery = JSON.parse(user.query);

  const [body, setBody] = useState(initialState);
  const [dinamicState, setDinamicState] = useState(initialDinamicState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useR2Trazabilidad(
    user.token,
    userQuery,
    dinamicState,
    reload
  );
  if (loading)
    return (
      <div>
        <Card className="w-full">
          <CardHeader className="flex gap-3 p-4">
            <div className="flex flex-col">
              <p className="text-2xl">Mis solicitudes</p>
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

export default HomeUser;
