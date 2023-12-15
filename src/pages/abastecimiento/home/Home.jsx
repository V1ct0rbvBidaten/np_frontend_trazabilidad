import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import HomeTable from "./HomeTable";

import { useState } from "react";
import useR2Trazabilidad from "../../../hooks/useR2andTrazabilidadData";

const initialStateMaterial = {
  page: 1,
  per_page: 10,
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  categoria_item: null,
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

const Home = ({ user }) => {
  const [body, setBody] = useState(initialStateMaterial);

  const { data: registros, loading } = useR2Trazabilidad(user.token, body);

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
        <HomeTable data={registros} filter={body} setFilter={setBody} />
      </div>
    </div>
  );
};

export default Home;
