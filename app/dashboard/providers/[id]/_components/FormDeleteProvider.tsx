"use client";

import deleteProvider from "@/actions/providers/delete";
import { Provider } from "@/entities";
import { Button } from "@heroui/react";

export default function FormDeleteProvider({provider}: { provider: Provider }) {
  const {providerId} = provider;
  const deleteProviderbyId = deleteProvider.bind(null, providerId);

  return (
    <form
      action={deleteProviderbyId}
      className="bg-[#f08532] p-8 rounded-[2.5rem] shadow-lg flex flex-col gap-6"
    >
      <h2 className="text-white text-2xl font-bold text-center">
        ¿Estás seguro de eliminar este proveedor?
      </h2>
      <p className="text-white/80 text-center text-sm">
        ¡{provider.providerName}! Esta acción no se puede deshacer y eliminará todos los productos asociados.
      </p>
      <Button
        type="submit"
        variant="danger"
        className="w-full mt-2 py-7 text-lg font-bold text-white hover:bg-red-1500 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
        >
        Confirmar Eliminación
      </Button>
    </form>
  );
}