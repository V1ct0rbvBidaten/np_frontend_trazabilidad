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
import { createTrazabilidad } from "../api/r2";

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

const ButtonActions = ({ data }) => {
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
    values.estado_pedido = "Despachada";

    createTrazabilidad(user.token, values)
      .then((res) => toast.success("Solicitud actualizada exitosamente"))
      .catch((err) => toast.error(err));
  };

  console.log(estado_pedido);

  return estado_pedido === "Gestionada" ? (
    <>gestionada</>
  ) : estado_pedido === "En proceso" ? (
    <>Aprobación</>
  ) : estado_pedido === "Despachada" ? (
    <>gestionada</>
  ) : estado_pedido === "Finalizada" ? (
    <>gestionada</>
  ) : stock === "BODEGA" ? (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Despachar solicitud
              </ModalHeader>
              {/* <ModalBody>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nullam pulvinar risus non risus hendrerit venenatis.
                          Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nullam pulvinar risus non risus hendrerit venenatis.
                          Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                          Magna exercitation reprehenderit magna aute tempor cupidatat
                          consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                          incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                          aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                          nisi consectetur esse laborum eiusmod pariatur proident Lorem
                          eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                      </ModalBody> */}
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
      <Button onClick={onOpen}>Despachar</Button>
    </>
  ) : (
    <Button>Cotizar</Button>
  );
};

export default ButtonActions;
