'use client';

import createManager from "@/actions/managers/create";
import { Button, Input, Label } from "@heroui/react";




export default function FormCreateManager() {
  return (
    <form
      action={createManager}
      className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4 w-[450px] max-h-[90vh] overflow-auto"
    >
      <h2 className="text-white text-3xl font-semibold text-center mb-2">
        Crear Manager
      </h2>

      <div className="flex flex-col gap-2">
        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Nombre completo
          </Label>
          <Input name="managerFullName" placeholder="Ingrese el nombre completo" required className="w-full" />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1"> 
            Email
          </Label>
          <Input name="managerEmail" type="email" placeholder="Ingrese el email" required className="w-full" />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Salario
          </Label>
          <Input name="managerSalary" placeholder="Ingrese el salario" required className="w-full" />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Teléfono
          </Label>
          <Input name="managerPhoneNumber" placeholder="Ingrese el teléfono" required className="w-full" />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-2 py-7 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
      >
        Crear Manager
      </Button>
    </form>
  );
}