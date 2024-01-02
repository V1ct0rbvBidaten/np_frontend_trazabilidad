import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createTrazabilidad, updateTrazabilidad } from "../api/r2";
import {
  ESTADO_COTIZANDO,
  ESTADO_DESPACHAR,
  ESTADO_EN_APROBACION_APROBADA,
  ESTADO_EN_APROBACION_RECHAZADA,
  ESTADO_FINALIZAR,
  ESTADO_GESTIONAR,
  ESTADO_EN_PROCESO,
} from "./estados_proceso";

const initialState = {
  estado_pedido: null,
  responsable_depacho: null,
  comentario_despacho: null,
  comentario_rechazo: null,
  receptor_despacho: null,
  nro_doc_respaldo: null,
  imagen_respaldo: null,
  fecha_cotizando: null,
  fecha_despachada: null,
  fecha_en_proceso: null,
  fecha_aprobada: null,
  fecha_rechazada: null,
  fecha_finalizada: null,
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
    responsable_depacho,
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function formatTimestamp(date) {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleDespachar = () => {
    values.pkey = pkey;
    values.fecha_despachada = formatTimestamp(new Date());
    values.estado_pedido = ESTADO_DESPACHAR;

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

  const handleCotizar = () => {
    values.pkey = pkey;
    values.fecha_cotizando = formatTimestamp(new Date());

    values.estado_pedido = ESTADO_COTIZANDO;

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

  const handleProceso = () => {
    values.pkey = pkey;
    values.fecha_en_proceso = formatTimestamp(new Date());
    values.estado_pedido = ESTADO_EN_PROCESO;

    updateTrazabilidad(user.token, Number(id), values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  const handleAprobar = () => {
    values.pkey = pkey;
    values.fecha_aprobada = formatTimestamp(new Date());
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
    values.fecha_rechazada = formatTimestamp(new Date());
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
    values.fecha_finalizada = formatTimestamp(new Date());
    values.estado_pedido = ESTADO_FINALIZAR;

    updateTrazabilidad(user.token, Number(id), values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err))
      .finally(() => {
        handleModal();
        resetState();
      });
  };

  return user.role === "admin" ? (
    estado_pedido === ESTADO_EN_PROCESO ? (
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
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Despachar solicitud
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Input
                      label="Responsable despacho"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.responsable_depacho}
                      name="responsable_despacho"
                      onChange={handleChange}
                      variant="bordered"
                    />
                    <Textarea
                      label="Comentario despacho"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.comentario_despacho}
                      onChange={handleChange}
                      name="comentario_despacho"
                      variant="bordered"
                    />
                  </div>
                </ModalBody>
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
          // onPress={handleDespachar}
          onClick={onOpenChange}
          className="bg-amber-500 text-white"
          radius="full"
        >
          Despachar
        </Button>
      </>
    ) : estado_pedido === ESTADO_COTIZANDO ? (
      <Button
        onPress={handleProceso}
        className="bg-amber-500 text-white"
        radius="full"
      >
        Iniciar Proceso de Aprobación
      </Button>
    ) : estado_pedido === ESTADO_DESPACHAR ? (
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Despachar solicitud
                </ModalHeader>
                <ModalBody>
                  <div className="grid gap-4">
                    <Input
                      label="Receptor despacho"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.receptor_despacho}
                      name="receptor_despacho"
                      onChange={handleChange}
                      variant="bordered"
                    />
                    <Input
                      label="Nº documento de respaldo"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.nro_doc_respaldo}
                      onChange={handleChange}
                      name="nro_doc_respaldo"
                      variant="bordered"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>

                  <Button
                    onPress={handleFinalizar}
                    className="bg-amber-500 text-white"
                    radius="full"
                  >
                    Finalizar solicitud
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button
          // onPress={handleDespachar}
          onClick={onOpenChange}
          className="bg-amber-500 text-white"
          radius="full"
        >
          Finalizar solicitud
        </Button>
      </>
    ) : stock === "BODEGA" ? (
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Despachar solicitud
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Input
                      label="Responsable despacho"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.responsable_depacho}
                      name="responsable_despacho"
                      onChange={handleChange}
                      variant="bordered"
                    />
                    <Textarea
                      label="Comentario despacho"
                      labelPlacement="outside"
                      placeholder=" "
                      size="sm"
                      className="w-full"
                      value={values.comentario_despacho}
                      onChange={handleChange}
                      name="comentario_despacho"
                      variant="bordered"
                    />
                  </div>
                </ModalBody>
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
          // onPress={handleDespachar}
          onClick={onOpenChange}
          className="bg-amber-500 text-white"
          radius="full"
        >
          Despachar
        </Button>
      </>
    ) : (
      <>
        <Button
          onPress={handleCotizar}
          className="bg-amber-500 text-white"
          radius="full"
        >
          Cotizar
        </Button>
      </>
    )
  ) : (
    <></>
  );
};

export default ButtonActions;
