'use client';

import { Location, Manager } from "@/entities";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

interface SelectManagerProps {
  managers: Manager[];
  locations: Location[];
  defaultManager?: string; // El ID del manager que viene del backend
}

export default function SelectManager({ managers, locations, defaultManager }: SelectManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Manager | null>(null);

  // 1. Efecto para inicializar el manager por defecto (Lo que hizo el profe en la img)
  useEffect(() => {
    if (defaultManager) {
      const manager = managers.find(m => m.managerId === defaultManager);
      if (manager) setSelected(manager);
    }
  }, [defaultManager, managers]);

  // 2. Lógica de bloqueo: Bloqueamos managers ocupados, EXCEPTO el que ya tiene esta tienda
  const disabledKeys = locations
    .map((location: Location) => location.manager?.managerId)
    .filter((managerId) => managerId !== undefined && managerId !== defaultManager);

  const handleSelect = (manager: Manager, isDisabled: boolean) => {
    if (isDisabled) return;
    setSelected(manager);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full font-sans">
      {/* Input oculto con el valor para el Server Action (usar managerId para evitar error 400) */}
      <input type="hidden" name="managerId" value={selected?.managerId || ""} />

      {/* Gatillo del Select */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer transition-all hover:ring-2 hover:ring-orange-100 flex justify-between items-center shadow-sm"
      >
        <div className="flex flex-col">
          <label className="text-[10px] uppercase font-bold text-gray-500 leading-tight mb-1">
            Manager de la Tienda
          </label>
          <span className={`text-sm font-semibold ${selected ? "text-gray-900" : "text-gray-400"}`}>
            {selected ? selected.managerFullName : "Selecciona un manager"}
          </span>
        </div>
        <LuChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          <div className="absolute z-[1010] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden p-1 animate-in fade-in zoom-in duration-150">
            <div className="max-h-56 overflow-y-auto">
              {managers.length === 0 ? (
                <div className="px-4 py-3 text-xs text-gray-400 italic">No hay managers cargados</div>
              ) : (
                managers.map((manager) => {
                  const isDisabled = disabledKeys.includes(manager.managerId);
                  const isSelected = selected?.managerId === manager.managerId;

                  return (
                    <div
                      key={manager.managerId}
                      onClick={() => handleSelect(manager, isDisabled)}
                      className={`px-4 py-3 text-sm rounded-lg transition-colors flex justify-between items-center font-medium
                        ${isDisabled 
                          ? "opacity-30 cursor-not-allowed bg-gray-50 text-gray-400" 
                          : isSelected 
                            ? "bg-orange-50 text-orange-700 cursor-pointer" 
                            : "text-gray-700 hover:bg-gray-50 cursor-pointer"
                        }`}
                    >
                      <span>{manager.managerFullName}</span>
                      {isDisabled ? (
                        <span className="text-[9px] uppercase font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-500">
                          Ocupado
                        </span>
                      ) : isSelected && (
                        <span className="text-[9px] uppercase font-bold bg-orange-200 px-2 py-0.5 rounded text-orange-700">
                          Actual
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Backdrop para cerrar el select */}
          <div className="fixed inset-0 z-[1005]" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}