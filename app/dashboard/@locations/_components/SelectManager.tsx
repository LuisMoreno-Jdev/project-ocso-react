'use client';

import { Location, Manager } from "@/entities";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function SelectManager({ managers, locations }: { managers: Manager[], locations: Location[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Manager | null>(null);

  // Lógica para obtener IDs de managers ya ocupados
  const disabledKeys = locations
    .map((location: Location) => location.manager?.managerId)
    .filter((managerId) => managerId !== undefined);

  const handleSelect = (manager: Manager, isDisabled: boolean) => {
    // Si está deshabilitado, no hacemos nada y cerramos el menú (opcional)
    if (isDisabled) return;
    
    setSelected(manager);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full font-sans">
      {/* Input oculto para que el Server Action reciba el ID del manager */}
      <input type="hidden" name="managerId" value={selected?.managerId || ""} />

      {/* Gatillo del Select */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 cursor-pointer transition-all hover:ring-2 hover:ring-red-100 flex justify-between items-center"
      >
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-gray-500 leading-tight mb-1">
            Manager
          </label>
          <span className={`text-sm font-medium ${selected ? "text-gray-900" : "text-gray-300"}`}>
            {selected ? selected.managerFullName : "Selecciona un manager"}
          </span>
        </div>
        <LuChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          <div className="absolute z-[1010] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden p-1 animate-in fade-in zoom-in duration-150">
            <div className="max-h-48 overflow-y-auto">
              {managers.length === 0 ? (
                <div className="px-4 py-3 text-xs text-gray-400 italic">No hay managers disponibles</div>
              ) : (
                managers.map((manager) => {
                  // Verificamos si este manager específico debe estar deshabilitado
                  const isDisabled = disabledKeys.includes(manager.managerId);
                  const isSelected = selected?.managerId === manager.managerId;

                  return (
                    <div
                      key={manager.managerId}
                      onClick={() => handleSelect(manager, isDisabled)}
                      className={`px-4 py-3 text-sm rounded-lg transition-colors flex justify-between items-center font-semibold tracking-wide 
                        ${isDisabled 
                          ? "opacity-40 cursor-not-allowed bg-gray-50 text-gray-400" 
                          : isSelected 
                            ? "bg-red-50 text-red-700 cursor-pointer" 
                            : "text-gray-700 hover:bg-gray-50 cursor-pointer"
                        }`}
                    >
                      <span>{manager.managerFullName}</span>
                      {isDisabled && (
                        <span className="text-[9px] uppercase font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-500">
                          Asignado
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="fixed inset-0 z-[1005]" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}