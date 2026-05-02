"use client";

import updateProvider from "@/actions/providers/update";
import { Provider } from "@/entities";
import { Button, Input, Label } from "@heroui/react";
import ModalDeleteProvider from "./DeleteProvider";
import FormDeleteProvider from "./FormDeleteProvider";

export default function FormUpdateProvider({ provider }: { provider: Provider }) {
    // El .bind es correcto, el problema era el filtrado en el Action
    const updateWithId = updateProvider.bind(null, provider.providerId);

    return(
      <form
        action={updateWithId}
        className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4 w-[400px]"
      >
        <h2 className="text-white text-3xl font-semibold text-center mb-2">
          Actualizar Proveedor
        </h2>

        <div className="flex flex-col gap-4">
          {/* Campo Nombre */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
            <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
              Nombre del Proveedor
            </Label>
            <Input
              name="providerName"
              defaultValue={provider.providerName}
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          {/* Campo Email */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
            <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
              Email
            </Label>
            <Input
              name="providerEmail"
              defaultValue={provider.providerEmail}
              type="email"
              required
            />
          </div>

          {/* Campo Teléfono */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
            <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
              Teléfono
            </Label>
            <Input
              name="providerPhoneNumber"
              defaultValue={provider.providerPhoneNumber}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-2 py-7 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
        >
          Guardar Cambios
        </Button>
        <div className="flex flex-col items-center justify-center">
          <ModalDeleteProvider>
            <FormDeleteProvider provider={provider} />
          </ModalDeleteProvider>
        </div>
      </form>
    )
}