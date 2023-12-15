import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { formatDate } from "../../../functions/utils";

const ModalHome = ({ data, open, handleModal }) => {
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

  return (
    <Modal size="5xl" isOpen={open} onOpenChange={handleModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Solicitud de pedido
            </ModalHeader>
            <ModalBody>
              {/* {JSON.stringify(data)} */}
              <div className="grid grid-cols-5 gap-2 justify-end">
                <Input
                  label="N` Solicitud"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={id_solped}
                  variant="bordered"
                />

                <Input
                  label="Fecha Solicitud"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={formatDate(fecha_creacion_solped)}
                  variant="bordered"
                />

                <Input
                  label="Grupo de compra"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={grupo_compra}
                  variant="bordered"
                />

                <Input
                  label="Solicitante"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={solicitante}
                  variant="bordered"
                />
                <Input
                  label="Grupo Artículo"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={grupo_articulos}
                  variant="bordered"
                />

                <Input
                  label="Id Aprobación"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={id_aprobacion}
                  variant="bordered"
                />

                <Input
                  label="Estado Gestión"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={estado_pedido}
                  variant="bordered"
                />

                <Input
                  label="Estado Proceso"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={estado}
                  variant="bordered"
                />

                <Input
                  label="Centro de Costo"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={ceco}
                  variant="bordered"
                />

                <Input
                  label="Item Code"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={item_code}
                  //   variant="bordered"
                />

                <Input
                  label="Item"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full col-span-2"
                  value={item}
                  //   variant="bordered"
                />

                <Input
                  label="Cantidad"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={cantidad}
                  //   variant="bordered"
                />

                <Input
                  label="Categoria Item"
                  labelPlacement="outside"
                  placeholder="Null"
                  isReadOnly
                  className="w-full"
                  value={categoria_item}
                  //   variant="bordered"
                />

                <p className="col-span-5 mt-2">Estado Solicitud</p>
                <Divider className="col-span-5" />
              </div>

              {/* <p>{JSON.stringify(data)}</p> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              {/* <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalHome;
