"use client";

import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import FormNewProvider from "./FormNewProvider";

export default function ModalNewProvider() {
  // Cambiamos 'open' por 'isOpen' para cumplir con la interfaz de HeroUI
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* Usamos onPress para activar el estado */}
      <Button
        onPress={() => setIsOpen(true)}
        className="font-bold shadow-lg flex items-center gap-2"
      >
        <LuPlus size="20" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[450px]">
            <Modal.CloseTrigger />
            <Modal.Body>
              {/* Pasamos la función para cerrar el modal */}
              <FormNewProvider close={() => setIsOpen(false)} />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}