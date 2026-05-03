'use client'

import { Provider } from "@/entities";
import { Label, ListBox, Select } from "@heroui/react";

export default function Select_Provider({
  providers,
  defaultProvider,
}: {
  providers: Provider[],
  defaultProvider?: string, // Opcional por si no hay default
}) {
  return (
    <Select 
      name="provider" 
      // Eliminamos w-[256px] y usamos w-full para que coincida con los otros inputs
      className="w-full" 
      placeholder="Selecciona un proveedor"
      // Según la doc v3, se usa defaultSelectedKey para uncontrolled
      defaultSelectedKey={defaultProvider}
    >
      <Label className="text-xs font-bold text-black ml-1">Proveedor</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {providers.map((provider) => (
            <ListBox.Item
              // Importante: id y key deben ser el valor que quieres enviar (el ID)
              id={provider.providerId} 
              key={provider.providerId}
              textValue={provider.providerName}
              className="text-md"
            >
              {provider.providerName}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}