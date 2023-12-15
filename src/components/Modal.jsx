import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
  Tab,
  Tabs,
  Card,
  CardBody,
  Textarea,
} from "@nextui-org/react";
import { formatDate } from "../functions/utils";
import { Stepper, Step } from "react-form-stepper";
import ButtonActions from "../pages/abastecimiento/materiales/gestionar/ButtonActions";

const ModalComponent = ({ data, open, handleModal, buttonActions }) => {
  const {
    docentry,
    id_solped,
    fecha_creacion_solped,
    linea_item,
    ceco,
    grupo_articulos,
    grupo_compra,
    solicitante,
    cantidad,
    item_code,
    item,
    id_aprobacion,
    fecha_proceso,
    categoria_item,
    pkey,
    stock,
    stock_fisico,
    numero_oc,
    oc_cancelada,
    borrador_oc,
    fecha_borrador_oc,
    fecha_creacion_oc,
    id_borrador_oc,
    proveedor,
    estado,
    id,
    estado_pedido,
    bodega,
    rut,
    rut_2,
    proveedor_2,
    rut_3,
    proveedor_3,
    nro_oc,
    fecha_oc,
    observacion,
    responsable,
    fecha_cotizando,
    fecha_flujo,
    fecha_despacho,
    fecha_entrega,
  } = data;

  let flujo = [
    { title: "Por Gestionar" },
    { title: "Gestionada" },
    { title: "En Aprobación" },
    { title: "Despachada" },
    { title: "Finalizada" },
  ];

  const index =
    flujo.findIndex((item) => item.title === estado_pedido) >= 0
      ? flujo.findIndex((item) => item.title === estado_pedido)
      : 0;

  return (
    <Modal size="5xl" isOpen={open} onOpenChange={handleModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p>
                Solicitud de pedido
                <Button className="ml-4 bg-purple-500 text-white" size="sm">
                  {stock}
                </Button>
              </p>
            </ModalHeader>
            <ModalBody>
              {/* {JSON.stringify(data)} */}
              <div className="grid grid-cols-4 gap-2 ">
                <Input
                  label="Id Aprobación"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={id_aprobacion}
                  variant="bordered"
                />

                <Input
                  label="Grupo de compra"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={grupo_compra}
                  variant="bordered"
                />

                <Input
                  label="Solicitante"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={solicitante}
                  variant="bordered"
                />
                <Input
                  label="Centro de Costo"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={ceco}
                  variant="bordered"
                />

                <Input
                  label="Proveedor"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={proveedor}
                  variant="bordered"
                />
                <Input
                  label="Grupo Artículo"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={grupo_articulos}
                  variant="bordered"
                />

                <Input
                  label="Estado Gestión"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={estado_pedido}
                  variant="bordered"
                />

                <Input
                  label="Estado Proceso Aprobación"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={estado}
                  variant="bordered"
                />
                <div className="col-span-4 w-full mt-2">
                  <Tabs aria-label="Options">
                    <Tab key="item" title="Item">
                      <Card>
                        <CardBody>
                          <div className="grid grid-cols-5 gap-2">
                            <Input
                              label="Item Code"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={item_code}
                              //   variant="bordered"
                            />

                            <Input
                              label="Item"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full col-span-2"
                              value={item}
                              //   variant="bordered"
                            />

                            <Input
                              label="Cantidad"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={cantidad}
                              //   variant="bordered"
                            />

                            <Input
                              label="Categoria Item"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={categoria_item}
                              //   variant="bordered"
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="documentos" title="Documentos">
                      <Card className="w-full">
                        <CardBody className="grid grid-cols-6 gap-2">
                          <Input
                            label="N` Solicitud"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={id_solped}
                            variant="bordered"
                          />

                          <Input
                            label="Fecha Solicitud"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={formatDate(fecha_creacion_solped)}
                            variant="bordered"
                          />
                          <Input
                            label="Id Borrador OC"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={id_borrador_oc}
                            variant="bordered"
                          />
                          <Input
                            label="Fecha Borrador OC"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={formatDate(fecha_borrador_oc)}
                            variant="bordered"
                          />
                          <Input
                            label="Id OC"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={numero_oc}
                            variant="bordered"
                          />
                          <Input
                            label="Fecha OC"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={formatDate(fecha_oc)}
                            variant="bordered"
                          />
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="proveedores" title="Proveedores">
                      <Card>
                        <CardBody>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              label="Rut"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={rut}
                              variant="bordered"
                            />
                            <Input
                              label="Proveedor"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={proveedor}
                              variant="bordered"
                            />
                            <Input
                              label="Rut"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={rut_2}
                              variant="bordered"
                            />
                            <Input
                              label="Proveedor"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={proveedor_2}
                              variant="bordered"
                            />
                            <Input
                              label="Rut"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={rut_3}
                              variant="bordered"
                            />
                            <Input
                              label="Proveedor"
                              labelPlacement="outside"
                              placeholder=" "
                              size="sm"
                              isReadOnly
                              className="w-full"
                              value={proveedor_3}
                              variant="bordered"
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>

                <p className="col-span-3 mt-2">Estado Gestión</p>
                <Divider className="col-span-3" />
                <div className="col-span-3 mt-2">
                  <Stepper activeStep={index}>
                    <Step label="Por Gestionar" />
                    <Step label="Gestionada" />
                    <Step label="En Proceso" />
                    <Step label="Despachada" />
                    <Step label="Finalizada" />
                  </Stepper>
                </div>
                <Textarea
                  label="Observación"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  isReadOnly
                  className="w-full"
                  value={observacion}
                  variant="bordered"
                />
              </div>

              {/* <p>{JSON.stringify(data)}</p> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <ButtonActions data={data} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
