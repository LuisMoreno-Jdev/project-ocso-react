'use client'
import { Location } from "@/entities";

export default function SelectStore({ stores, defaultStore }: { stores: Location[], defaultStore?: number }) {
  
  // CORRECCIÓN: Verificamos si existe el manager y si tiene un ID (no es null ni undefined)
  const disabledStores = stores
    .filter(store => {
      // Si la tienda es la que ya tiene asignada el manager actual, no la bloqueamos
      if (store.locationId === defaultStore) return false;
      
      // Bloqueamos solo si el objeto manager existe y tiene datos reales
      // Usamos !! para convertir a booleano y verificar que no sea null
      return !!store.manager && store.manager.managerId !== undefined;
    })
    .map(store => store.locationId);

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-bold text-white uppercase tracking-wide">
        Seleccionar Tienda
      </label>
      <div className="relative">
        <select 
          name="locationId"
          defaultValue={defaultStore || ""}
          className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none transition-colors appearance-none cursor-pointer text-gray-800 font-medium disabled:bg-gray-100"
        >
          <option value="" disabled={!!defaultStore}>
            {defaultStore ? "Tienda asignada" : "Selecciona una tienda"}
          </option>
          
          {stores.map((store: Location) => {
            const isOccupied = disabledStores.includes(store.locationId);
            
            return (
              <option 
                key={store.locationId} 
                value={store.locationId}
                disabled={isOccupied}
                className={isOccupied ? "text-gray-300" : "text-gray-900"}
              >
                {store.locationName} {isOccupied ? "— (Ocupada)" : ""}
              </option>
            );
          })}
        </select>
        
        {/* Icono de flecha para el select (ya que usamos appearance-none) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}