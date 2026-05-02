'use client'
import { Location } from "@/entities";

export default function SelectStore({ stores, defaultStore }: { stores: Location[], defaultStore?: number }) {
  
  // Mapeamos las tiendas que deben estar deshabilitadas porque ya tienen manager
  // Basado en tu lógica original: store.manager !== undefined
  const disabledStores = stores
    .filter(store => store.manager !== undefined && store.locationId !== defaultStore)
    .map(store => store.locationId);

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
        Seleccionar Tienda
      </label>
      <select 
        defaultValue={defaultStore}
        className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-colors appearance-none cursor-pointer text-gray-800 font-medium"
      >
        <option value="" disabled={!!defaultStore}>
          Selecciona una tienda
        </option>
        
        {stores.map((store: Location) => {
          const isOccupied = disabledStores.includes(store.locationId);
          
          return (
            <option 
              key={store.locationId} 
              value={store.locationId}
              disabled={isOccupied}
              className={isOccupied ? "text-gray-400" : "text-gray-900"}
            >
              {store.locationName} {isOccupied ? "(Ocupada)" : ""}
            </option>
          );
        })}
      </select>
    </div>
  );
}