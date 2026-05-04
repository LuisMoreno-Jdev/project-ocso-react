"use client";

import { Button, Modal } from "@heroui/react";
import { ReactNode } from "react";

export default function CreateManagerModal({children, icon}: {children: ReactNode, icon: ReactNode}) {
  return (
    <Modal>
      <Button className="w-[100px] h-[40px] hover:bg-[#1B3B66]">{icon}</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="">
            <Modal.CloseTrigger />
            <Modal.Body>
              {children}
              <Button className="w-[100px] self-start mt-4" slot="close" variant="ghost">
                Cancel
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}