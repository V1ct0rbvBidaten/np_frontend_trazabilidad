import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createTrazabilidad, updateTrazabilidad } from "../api/r2";
import {
  ESTADO_DESPACHAR,
  ESTADO_EN_APROBACION_APROBADA,
  ESTADO_EN_APROBACION_RECHAZADA,
  ESTADO_FINALIZAR,
  ESTADO_GESTIONAR,
} from "./estados_proceso";

const initialState = {
  estado_pedido: null,
  bodega: null,
  rut: null,
  proveedor: null,
  rut_2: null,
  proveedor_2: null,
  rut_3: null,
  proveedor_3: null,
  nro_ic: null,
  fecha_oc: null,
  observacion: null,
  responsable: null,
  pkey: null,
  fecha_cotizando: null,
  fecha_flujo: null,
  fecha_despacho: null,
  fecha_entrega: null,
};

const ButtonActions = ({ data, handleModal, resetState }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state) => state.user);

  const [values, setValues] = useState(initialState);

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDespachar = () => {
    values.pkey = pkey;
    values.fecha_despacho = Date.now();
    values.estado_pedido = ESTADO_DESPACHAR;

    createTrazabilidad(user.token, values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  const handleCotizar = () => {
    values.pkey = pkey;
    values.fecha_cotizando = Date.now();
    values.estado_pedido = ESTADO_GESTIONAR;

    if (!id) {
      createTrazabilidad(user.token, values)
        .then((res) => toast.success("Solicitud actualizada exitosamente"))
        .catch((err) => toast.error(err))
        .finally(() => {
          handleModal();
          resetState();
        });
    } else {
      updateTrazabilidad(user.token, Number(id), values)
        .then((res) => toast.success("Solicitud actualizada exitosamente"))
        .catch((err) => toast.error(err))
        .finally(() => {
          handleModal();
          resetState();
        });
    }
  };

  const handleAprobar = () => {
    values.pkey = pkey;
    values.fecha_despacho = Date.now();
    values.estado_pedido = ESTADO_EN_APROBACION_APROBADA;

    updateTrazabilidad(user.token, Number(id), values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  const handleRechazar = () => {
    values.pkey = pkey;
    values.fecha_despacho = Date.now();
    values.estado_pedido = ESTADO_EN_APROBACION_RECHAZADA;

    updateTrazabilidad(user.token, Number(id), values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  const handleFinalizar = () => {
    values.pkey = pkey;
    values.fecha_entrega = Date.now();
    values.estado_pedido = ESTADO_FINALIZAR;

    updateTrazabilidad(user.token, Number(id), values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  return estado_pedido === ESTADO_GESTIONAR ? (
    <>
      <Button
        onPress={handleRechazar}
        className="bg-rose-500 text-white"
        radius="full"
      >
        Rechazar
      </Button>
      <Button
        onPress={handleAprobar}
        className="bg-emerald-500 text-white"
        radius="full"
      >
        Aprobar
      </Button>
    </>
  ) : estado_pedido === ESTADO_EN_APROBACION_APROBADA ? (
    <Button
      onPress={handleDespachar}
      className="bg-amber-500 text-white"
      radius="full"
    >
      Despachar
    </Button>
  ) : estado_pedido === ESTADO_DESPACHAR ? (
    <Button
      onPress={handleFinalizar}
      className="bg-amber-500 text-white"
      radius="full"
    >
      Finalizar
    </Button>
  ) : stock === "BODEGA" ? (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Despachar solicitud
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>

                <Button
                  onPress={handleDespachar}
                  className="bg-amber-500 text-white"
                  radius="full"
                >
                  Despachar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={handleDespachar}
        className="bg-amber-500 text-white"
        radius="full"
      >
        Despachar
      </Button>
    </>
  ) : (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cotizar solicitud
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleDespachar}>
                  Despachar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={handleCotizar}
        className="bg-amber-500 text-white"
        radius="full"
      >
        Cotizar
      </Button>
    </>
  );
};

export default ButtonActions;
