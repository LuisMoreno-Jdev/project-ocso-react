"use client";

import createProvider from "@/actions/providers/create";
import { Button, Input, Label } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function FormNewProvider({ close }: { close: () => void }) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProvider(formData);
    // Refresca la ruta actual para traer datos nuevos del servidor
    router.refresh();
    // Cierra el modal
    close();
  };

  return (
    <form
      action={handleSubmit}
      className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4 w-full"
    >
      <h2 className="text-white text-3xl font-semibold text-center mb-2">
        Agregar Proveedor
      </h2>

      <div className="flex flex-col gap-4">
        {/* Nombre */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
            Nombre del Proveedor
          </Label>
          <Input
            name="providerName"
            placeholder="Ingrese el nombre"
            required
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
            Email
          </Label>
          <Input
            name="providerEmail"
            type="email"
            placeholder="correo@ejemplo.com"
            required
            className="w-full"
          />
        </div>

        {/* Teléfono */}
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
            Teléfono
          </Label>
          <Input
            name="providerPhoneNumber"
            placeholder="442..."
            required
            className="w-full"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-2 py-7 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
      >
        Guardar Proveedor
      </Button>
    </form>
  );
}