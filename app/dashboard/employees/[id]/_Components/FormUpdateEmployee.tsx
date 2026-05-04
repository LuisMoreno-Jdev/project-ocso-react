import updateEmployee from "@/actions/employees/update";
import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input, Label } from "@heroui/react";
import SelectLocation from "../../_components/SelectLocation";

export default async function FormUpdateEmployee({ employee }: { employee: Employee }) {
  const resolvedHeaders = await authHeaders();
  
  // Obtenemos las tiendas desde el servidor usando las cookies/headers
  const response = await fetch(`${API_URL}/locations`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
    },
    next: { tags: ["locations"] }
  });

  const stores = await response.json();
  const employeeId = employee.employeeId;

  // Usamos bind para pasar el ID de forma segura a la Server Action
  const updateEmployeeWithId = updateEmployee.bind(null, employeeId);

  return (
    <form
      action={updateEmployeeWithId}
      className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4 w-[400px]"
    >
      <h2 className="text-white text-3xl font-semibold text-center mb-2">
        Actualizar Empleado
      </h2>

      <div className="flex flex-col gap-4">
        {/* Campo Nombre */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Nombre del Empleado
          </Label>
          <Input
            name="employeeName"
            defaultValue={employee.employeeName}
            placeholder="Ingrese el nombre"
          />
        </div>

        {/* Campo Apellido */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Apellido del Empleado
          </Label>
          <Input
            name="employeeLastName"
            defaultValue={employee.employeeLastName}
            placeholder="Ingrese el apellido"
          />
        </div>
        
         {/* Campo Tienda - Pasamos las tiendas obtenidas del server */}
        <div className="w-full bg-white rounded-2xl p-2">
            <SelectLocation stores={stores} />
        </div>

        {/* Campo Email */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Email del Empleado
          </Label>
          <Input
            name="employeeEmail"
            defaultValue={employee.employeeEmail}
            type="email"
          />
        </div>

        {/* Campo Teléfono */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Teléfono del Empleado
          </Label>
          <Input
            name="employeePhoneNumber"
            defaultValue={employee.employeePhoneNumber}
          />
        </div>

        {/* Campo Foto Empleado */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Foto del Empleado
          </Label>
          <Input
            name="employeePhoto"
            type="file"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-2 py-7 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
      >
        Guardar Cambios
      </Button>
    </form>
  );
}