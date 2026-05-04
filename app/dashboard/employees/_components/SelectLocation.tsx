'use client'

import { Location } from "@/entities";
import { Label, ListBox, Select } from "@heroui/react";

export default function SelectLocation({ 
  stores, 
  defaultStore 
}: { 
  stores: Location[], 
  defaultStore?: number | undefined
}) {
  return (
    <Select 
      name="location"
      className="w-full" 
      placeholder="Selecciona una tienda"
      defaultValue={defaultStore ? String(defaultStore) : undefined}
    >
      <Label className="text-xs font-bold text-black ml-1">Tienda</Label>
      
      <Select.Trigger className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
        <Select.Value className="text-gray-700" />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {stores.map((store: Location) => (
            <ListBox.Item 
              key={store.locationId} 
              id={String(store.locationId)} 
              textValue={store.locationName}
            >
              {store.locationName}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}