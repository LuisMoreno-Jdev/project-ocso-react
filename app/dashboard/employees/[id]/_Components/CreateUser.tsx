"use client";

import { Button, Modal } from "@heroui/react";
import Image from "next/image";
import { ReactNode } from "react";

export function CreateUserModal({ children, photo }: { children: ReactNode, photo: string }) {
  return (
    <Modal>
      <Modal.Trigger>
        <div className="relative size-72 cursor-pointer overflow-hidden">
          <Image 
            src={photo} 
            alt="Employee Photo" 
            className="object-cover hover:scale-110 transition-transform duration-500"
            unoptimized
            fill
          />
        </div>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-orange-400 border-none shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Body className="p-6">
              {children}
              <Button 
                className="w-[100px] self-start mt-4 text-white border-white hover:bg-orange-500" 
                slot="close" 
                variant="ghost"
              >
                Cancelar
              </Button>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}