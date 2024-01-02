import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectSection,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useState } from "react";
import { createUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import useCeco from "../../../hooks/useCeco";
import useGrupoArticulos from "../../../hooks/useGrupoArticulos";
import useSolicitante from "../../../hooks/useSolicitante";
import useGrupoCompra from "../../../hooks/useGrupoCompra";
import useProveedor from "../../../hooks/useProveedor";

const initialState = {
  nombre_completo: null,
  email: null,
  contrasena: null,
  role: "user",
  query: "",
  activo: true,
};

const pageState = {
  page: 1,
  per_page: 100,
};

const queryState = {
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
  proveedor: null,
};

const CreateNuevoUsuarioModal = ({ isOpen, onOpenChange }) => {
  const [queryData, setQueryData] = useState(queryState);
  const [body, setBody] = useState(pageState);
  const [reload, setReload] = useState(false);
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialState);

  const { data: ceco, loading } = useCeco(user.token, body, reload);
  const { data: proveedor } = useProveedor(user.token, body, reload);
  const { data: solicitante } = useSolicitante(user.token, body, reload);
  const { data: grupoArticulo } = useGrupoArticulos(user.token, body, reload);
  const { data: grupoCompra } = useGrupoCompra(user.token, body, reload);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    values.query = JSON.stringify(queryData);
    createUser(user.token, values)
      .then((res) => toast.success("Usuario creado exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => onOpenChange());
  };

  const { nombre_completo, email, contrasena, role, query } = values;

  return (
    <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Usuario
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-4 gap-4">
                <Input
                  type="text"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Ingrese nombre de usuario"
                  value={nombre_completo}
                  name="nombre_completo"
                  onChange={handleChange}
                />

                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Ingrese email de usuario"
                  value={email}
                  name="email"
                  onChange={handleChange}
                />

                <Input
                  type="password"
                  label="Contraseña"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Ingrese contraseña de usuario"
                  value={contrasena}
                  name="contrasena"
                  onChange={handleChange}
                />

                <Select
                  label="Rol"
                  className="max-w-xs"
                  labelPlacement="outside"
                  placeholder="Seleccion rol"
                  variant="bordered"
                  value={role}
                  name="role"
                  onChange={handleChange}
                >
                  <SelectItem key="admin" value="admin">
                    Admin
                  </SelectItem>

                  <SelectItem key="user" value="user">
                    Solicitante
                  </SelectItem>
                </Select>
              </div>
              <div className="grid grid-cols-5 gap-4 mt-3">
                {role === "user" && (
                  <>
                    <div className="col-span-4">
                      <p>Asignar query a usuario</p>
                    </div>
                    <Input
                      type="date"
                      label="Seleccionar fecha desde"
                      placeholder="Fecha creación solped"
                      name="fecha_creacion_solped_start"
                      value={queryData.fecha_creacion_solped_start}
                      onChange={handleFilterChange}
                      className=" col-span-2"
                      size="sm"
                    />
                    <div className=""></div>
                    <Input
                      type="date"
                      label="Seleccionar fecha hasta"
                      placeholder="Fecha creación solped"
                      name="fecha_creacion_solped_end"
                      value={queryData.fecha_creacion_solped_end}
                      onChange={handleFilterChange}
                      className=" col-span-2"
                      size="sm"
                    />
                    <Select
                      label="Seleccionar CECO"
                      placeholder="CECO"
                      name="ceco"
                      selectionMode="multiple"
                      value={queryData.ceco}
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
                      value={queryData.solicitante}
                      onChange={handleFilterChange}
                      className="max-w-xs"
                      size="sm"
                    >
                      {solicitante.data.map((item) => (
                        <SelectItem
                          key={item.solicitante}
                          value={item.solicitante}
                        >
                          {item.solicitante}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Seleccionar grupo artículos"
                      placeholder="Grupo Artículos"
                      name="grupo_articulo"
                      selectionMode="multiple"
                      value={queryData.grupo_articulo}
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
                      value={queryData.grupo_compra}
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

                    <Autocomplete
                      label="Seleccionar proveedor"
                      placeholder="Proveedor"
                      name="proveedor"
                      selectionMode="multiple"
                      value={queryData.proveedor}
                      onChange={handleFilterChange}
                      className="max-w-xs"
                      size="sm"
                    >
                      {proveedor.data.map((item) => (
                        <AutocompleteItem
                          key={item.proveedor}
                          value={item.proveedor}
                        >
                          {item.proveedor}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateNuevoUsuarioModal;
