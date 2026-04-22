"use client";
import { Location } from "@/entities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function SelectLocation({ 
  locations, 
  store 
}: { 
  locations: Location[], 
  store?: string | string[] | undefined 
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const getStoreId = (s: typeof store) => (s ? Number(Array.isArray(s) ? s[0] : s) : null);

  const [selected, setSelected] = useState<Location | null>(() => {
    const id = getStoreId(store);
    return locations.find(loc => loc.locationId === id) || null;
  });

  useEffect(() => {
    const id = getStoreId(store);
    const found = locations.find(loc => loc.locationId === id);
    setSelected(found || null);
  }, [store, locations]);

  const handleSelect = (location: Location | null) => {
    setSelected(location);
    setIsOpen(false);
    
    // Al navegar sin el query param, LocationCard recibirá store=undefined y se ocultará.
    if (location) {
      router.push(`/dashboard?store=${location.locationId}`);
    } else {
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="relative w-full text-black font-sans z-[1001]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-200 py-2 px-4 outline-none rounded-xl transition-all duration-300 hover:ring-2 hover:ring-red-300 hover:border-transparent flex justify-between items-center shadow-sm text-left relative z-[1001]"
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-500 leading-tight">
            Tienda
          </span>
          <span className={`text-sm ${selected ? "text-gray-800 font-medium" : "text-gray-400"}`}>
            {selected ? selected.locationName : "Selecciona una tienda"}
          </span>
        </div>
        <LuChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="absolute z-[1002] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden p-1 animate-in fade-in zoom-in duration-150">
            <div className="max-h-60 overflow-y-auto">
              <div
                onClick={() => handleSelect(null)}
                className="px-4 py-3 text-sm cursor-pointer rounded-lg text-gray-400 hover:bg-gray-50 transition-colors flex items-center italic"
              >
                NINGUNA (Limpiar selección)
              </div>
              
              <hr className="border-gray-100 my-1" />

              {locations.map((loc) => {
                const isSelected = selected?.locationId === loc.locationId;
                return (
                  <div
                    key={loc.locationId}
                    onClick={() => handleSelect(loc)}
                    className={`px-4 py-3 text-sm cursor-pointer rounded-lg transition-colors flex items-center font-semibold tracking-wide 
                      ${isSelected ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-red-50 hover:text-red-700"}`}
                  >
                    {loc.locationName.toUpperCase()}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fixed inset-0 z-[1000] bg-transparent" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}