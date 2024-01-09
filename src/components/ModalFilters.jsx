import { useState } from "react";
import useCeco from "../hooks/useCeco";
import useGrupoArticulos from "../hooks/useGrupoArticulos";
import useSolicitante from "../hooks/useSolicitante";
import useGrupoCompra from "../hooks/useGrupoCompra";
import useProveedor from "../hooks/useProveedor";

import {
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Autocomplete,
  AutocompleteItem,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

const initialState = {
  page: 1,
  per_page: 100,
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  categoria_item: "material",
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
  proveedor: null,
  fecha_borrador_oc_start: null,
  fecha_borrador_oc_end: null,
  fecha_creacion_oc_start: null,
  fecha_creacion_oc_end: null,
  docentry: null,
  id_solped: null,
  item_code: null,
  id_aprobacion: null,
  numero_oc: null,
  borrador_oc: null,
  id_borrador_oc: null,
  estado: null,
};

const ModalFilters = ({
  open,
  handleModal,
  filterData,
  handleFilterSubmit,
  handleFilterChange,
  user,
}) => {
  const [body, setBody] = useState(initialState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: ceco, loading } = useCeco(user.token, body, reload);
  // const { data: proveedor } = useProveedor(user.token, body, reload);
  const { data: solicitante } = useSolicitante(user.token, body, reload);
  const { data: grupoArticulo } = useGrupoArticulos(user.token, body, reload);
  const { data: grupoCompra } = useGrupoCompra(user.token, body, reload);

  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <Modal size="5xl" isOpen={open} onOpenChange={handleModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Filtrar tabla:
            </ModalHeader>
            <ModalBody>
              {/* {JSON.stringify(filterData)} */}
              <div className="grid grid-cols-4 gap-4">
                <Input
                  type="date"
                  label="Seleccionar fecha desde"
                  placeholder="Fecha creación solped"
                  name="fecha_creacion_solped_start"
                  value={filterData.fecha_creacion_solped_start}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />
                <Input
                  type="date"
                  label="Seleccionar fecha hasta"
                  placeholder="Fecha creación solped"
                  name="fecha_creacion_solped_end"
                  value={filterData.fecha_creacion_solped_end}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />
                <Select
                  label="Seleccionar CECO"
                  placeholder="CECO"
                  name="ceco"
                  selectionMode="multiple"
                  value={filterData.ceco}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                >
                  {ceco.data.map((item) => (
                    <SelectItem key={item.ceco} value={item.ceco}>
                      {item.ceco}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Seleccionar solicitante"
                  placeholder="Solicitante"
                  name="solicitante"
                  selectionMode="multiple"
                  value={filterData.solicitante}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                >
                  {solicitante.data.map((item) => (
                    <SelectItem key={item.solicitante} value={item.solicitante}>
                      {item.solicitante}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Seleccionar grupo artículos"
                  placeholder="Grupo Artículos"
                  name="grupo_articulo"
                  selectionMode="multiple"
                  value={filterData.grupo_articulo}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                >
                  {grupoArticulo.data.map((item) => (
                    <SelectItem
                      key={item.grupo_articulos}
                      value={item.grupo_articulos}
                    >
                      {item.grupo_articulos}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Seleccionar grupo compra"
                  placeholder="Grupo Compra"
                  name="grupo_compra"
                  selectionMode="multiple"
                  value={filterData.grupo_compra}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                >
                  {grupoCompra.data.map((item) => (
                    <SelectItem
                      key={item.grupo_compra}
                      value={item.grupo_compra}
                    >
                      {item.grupo_compra}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Seleccionar grupo compra"
                  placeholder="Proveedor"
                  name="proveedor"
                  value={filterData.proveedor}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />

                <Input
                  label="Docentry"
                  name="docentry"
                  value={filterData.docentry}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />

                <Input
                  label="ID Solped"
                  name="id_solped"
                  value={filterData.id_solped}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />

                <Input
                  label="Nro OC"
                  name="numero_oc"
                  value={filterData.numero_oc}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />

                <Input
                  label="Nro Borrador OC"
                  name="borrador_oc"
                  value={filterData.borrador_oc}
                  onChange={handleFilterChange}
                  className="max-w-xs"
                  size="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                className="bg-emerald-500 text-white"
                onPress={handleFilterSubmit}
              >
                Filtrar tabla
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalFilters;
