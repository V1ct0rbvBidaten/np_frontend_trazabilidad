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
} from "@nextui-org/react";
import { useState } from "react";
import { createUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  nombre_completo: null,
  email: null,
  contrasena: null,
  role: "user",
  activo: true,
};

const CreateNuevoUsuarioModal = ({ isOpen, onOpenChange }) => {
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    createUser(user.token, values)
      .then((res) => toast.success("Usuario creado exitosamente"))
      .catch((err) => toast.error(err));
  };

  const { nombre_completo, email, contrasena, role } = values;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Usuario
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
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
