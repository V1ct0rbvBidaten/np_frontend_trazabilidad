import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { capitalize } from "../functions/utils";

const ModalFilterColumns = ({
  open,
  handleModal,
  setVisibleColumns,
  visibleColumns,
  columns,
  handleFilterColumnSubmit,
}) => {
  return (
    <Modal size="5xl" isOpen={open} onOpenChange={handleModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Seleccione columnas de la tabla
            </ModalHeader>
            <ModalBody>
              <CheckboxGroup
                orientation="horizontal"
                color="secondary"
                value={visibleColumns}
                onChange={setVisibleColumns}
                // defaultValue={visibleColumns}
              >
                <div
                  className="grid grid-cols-6"
                  //   style={{ fontSize: "10px !important" }}
                >
                  {columns.map((c) => (
                    <Checkbox size="sm" value={c.uid} key={c.uid}>
                      {capitalize(c.name)}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>

              <Button
                color="success"
                variant="light"
                onPress={handleFilterColumnSubmit}
              >
                Guardar columnas
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalFilterColumns;
