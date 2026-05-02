"use client";

import { Button, Modal } from "@heroui/react";
import { ReactNode, useState } from "react";
import { LuTrash } from "react-icons/lu";

export default function ModalDeleteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        className="font-bold shadow-lg flex items-center gap-2"
        variant="danger"
      >
        <LuTrash size="20" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[450px]">
            <Modal.CloseTrigger />
            <Modal.Body className="p-0"> {/* p-0 para que el form naranja cubra todo */}
                {children}
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