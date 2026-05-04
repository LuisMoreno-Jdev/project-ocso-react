'use client';

import createEmployee from "@/actions/employees/create";
import { Location } from "@/entities";
import { Button, Input, Label } from "@heroui/react";
import { useActionState } from "react";
import SelectLocation from "./SelectLocation"; // El componente que hicimos antes

export default function FormCreateEmployee({ stores }: { stores: Location[] }) {
  // Ahora useActionState funciona porque este es un Client Component
  const [state, formAction, isPending] = useActionState(createEmployee, {
    success: false,
    error: null,
  });

  return (
    <form
      action={formAction}
      className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4 w-[450px] max-h-[90vh] overflow-auto"
    >
      <h2 className="text-white text-3xl font-semibold text-center mb-2">
        Crear Empleado
      </h2>

      {/* Mostrar error si existe */}
      {state?.error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-xl text-xs font-bold text-center">
          {Array.isArray(state.error) ? state.error.join(", ") : state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Nombre del Empleado
          </Label>
          <Input name="employeeName" placeholder="Ingrese el nombre" required />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Apellido del Empleado
          </Label>
          <Input name="employeeLastName" placeholder="Ingrese el apellido" required />
        </div>

        {/* SELECT DE TIENDAS - Pasamos las tiendas obtenidas del server */}
        <div className="w-full bg-white rounded-2xl p-2">
            <SelectLocation stores={stores} />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Email del Empleado
          </Label>
          <Input name="employeeEmail" type="email" placeholder="Ingrese el email" required />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Teléfono del Empleado
          </Label>
          <Input name="employeePhoneNumber" placeholder="Ingrese el teléfono" required />
        </div>

        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Foto del Empleado
          </Label>
          <Input name="employeePhoto" type="file" />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-2 py-7 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
      >
        {isPending ? "Creando..." : "Crear Empleado"}
      </Button>
    </form>
  );
}