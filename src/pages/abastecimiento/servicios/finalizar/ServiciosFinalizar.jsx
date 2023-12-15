import { useState } from "react";
import ServiciosTitle from "../ServiciosTitle";
import FinalizarTable from "./FinalizarTable";
import useR2Trazabilidad from "../../../../hooks/useR2andTrazabilidadData";

const initialState = {
  page: 1,
  per_page: 5,
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  categoria_item: "servicio",
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

const ServiciosFinalizar = ({ user }) => {
  const [body, setBody] = useState(initialState);

  const { data: registros, loading } = useR2Trazabilidad(user.token, body);

  if (loading)
    return (
      <div>
        <ServiciosTitle etapa={"Confirmar entrega de solicitudes"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <ServiciosTitle etapa={"Confirmar entrega de solicitudes"} />

      <div className="flex mt-2 w-full flex-col">
        <FinalizarTable data={registros} filter={body} setFilter={setBody} />
      </div>
    </div>
  );
};

export default ServiciosFinalizar;
