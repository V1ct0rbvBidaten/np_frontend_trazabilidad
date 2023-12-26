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
import ButtonActions from "./ButtonsActions";
import {
  ESTADO_COTIZANDO,
  ESTADO_DESPACHAR,
  ESTADO_EN_APROBACION_APROBADA,
  ESTADO_FINALIZAR,
  ESTADO_GESTIONAR,
  ESTADO_EN_PROCESO,
} from "./estados_proceso";

const ModalComponent = ({ data, open, handleModal, resetState }) => {
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
    fecha_oc,
    proveedor,
    estado,
    id,
    estado_pedido,
    responsable_despacho,
    comentario_despacho,
    comentario_rechazo,
    receptor_despacho,
    nro_doc_respaldo,
    imagen_respaldo,
    fecha_cotizando,
    fecha_despachada,
    fecha_en_proceso,
    fecha_aprobada,
    fecha_rechazada,
    fecha_finalizada,
  } = data;

  let flujo = [
    { title: ESTADO_GESTIONAR },
    { title: ESTADO_COTIZANDO },
    { title: ESTADO_EN_PROCESO },
    { title: ESTADO_EN_APROBACION_APROBADA },
    { title: ESTADO_DESPACHAR },
    { title: ESTADO_FINALIZAR },
  ];

  const index =
    flujo.findIndex((item) => item.title === estado_pedido) >= 0
      ? flujo.findIndex((item) => item.title === estado_pedido)
      : 0;

  return (
    <Modal
      size="5xl"
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={handleModal}
    >
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
                    <Tab key="despacho" title="Despacho">
                      <Card className="w-full">
                        <CardBody className="grid  gap-2">
                          <Input
                            label="Responsable despacho"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={responsable_despacho}
                            variant="bordered"
                          />

                          <Textarea
                            label="Fecha Solicitud"
                            labelPlacement="outside"
                            placeholder=" "
                            size="sm"
                            isReadOnly
                            className="w-full"
                            value={comentario_despacho}
                            variant="bordered"
                          />
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>

                <p className="col-span-4 mt-2">Estado Gestión</p>
                <Divider className="col-span-4" />
                <div className="col-span-4 mt-2">
                  <Stepper activeStep={index}>
                    <Step label={ESTADO_GESTIONAR} />
                    <Step label={ESTADO_COTIZANDO} />
                    <Step label={ESTADO_EN_PROCESO} />
                    <Step label={ESTADO_EN_APROBACION_APROBADA} />

                    <Step label={ESTADO_DESPACHAR} />
                    <Step label={ESTADO_FINALIZAR} />
                  </Stepper>
                </div>
              </div>

              {/* <p>{JSON.stringify(data)}</p> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <ButtonActions
                data={data}
                handleModal={handleModal}
                resetState={resetState}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
