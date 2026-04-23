import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { Location, Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SelectManager from "./SelectManager";

// CAMBIO: La función debe ser async y searchParams debe tratarse como Promise
export default async function FormNewLocation({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  
  // ESPERAR a que los params se resuelvan
  const params = await searchParams;

  // Si existe el query param 'store', no renderizamos nada
  if (params.store) return null;

  const resolvedHeaders = await authHeaders();

  // Llamadas a la API
  const  responseManagers = await fetch(`${API_URL}/managers`, {
    method: "GET",
    headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      next: {
        tags: ["dashboard:managers"],
      }
  });
  const dataManager: Manager[] = await responseManagers.json()

  const responseLocations = await fetch(`${API_URL}/locations`, {
    method: "GET",
    headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
    next: {
      tags: ["dashboard:locations"],
    }
  });
  const dataLocation: Location[] = await responseLocations.json()

  return (
    <div className="w-full max-w-md mt-10 animate-in fade-in zoom-in duration-500">
      <form 
        action={createLocation} 
        className="bg-[#f08532] p-6 rounded-[2.5rem] shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-white text-3xl font-semibold text-center mb-2">Crear Tienda</h2>

        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <label className="block text-xs font-semibold text-gray-500 mb-0.5 ml-1">Nombre</label>
          <input
            type="text"
            name="locationName"
            placeholder="Ej. OXXO CENTRO"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400 px-1"
          />
        </div>
        
        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <label className="block text-xs font-semibold text-gray-500 mb-0.5 ml-1">Direccion</label>
          <input
            type="text"
            name="locationAddress"
            placeholder="Ej. Calle 123, Ciudad, Estado"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400 px-1"
          />
        </div>

        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <label className="block text-xs font-semibold text-gray-500 mb-0.5 ml-1">Latitud</label>
          <input
            type="text"
            name="locationLat"
            placeholder="Ej. 20.7061"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400 px-1"
          />
        </div>

        <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
          <label className="block text-xs font-semibold text-gray-500 mb-0.5 ml-1">Longitud</label>
          <input
            type="text"
            name="locationLng"
            placeholder="Ej. -100.4365"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-400 px-1"
          />
        </div>

        <SelectManager managers={dataManager} locations={dataLocation}/>

        <button
          type="submit"
          className="w-full mt-2 py-4 text-lg font-bold text-white bg-[#0057ff] hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md"
        >
          Subir
        </button>
      </form>
    </div>
  );
}