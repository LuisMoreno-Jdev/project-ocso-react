"use client";

import { Button, Modal } from "@heroui/react";
import { ReactNode } from "react";
import { LuPlus } from "react-icons/lu";

export default function CreateManagerModal({children}: {children: ReactNode}) {
  return (
    <Modal>
      <Button className="w-[100px] h-[40px] hover:bg-[#1B3B66]"><LuPlus size="20" /></Button>
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