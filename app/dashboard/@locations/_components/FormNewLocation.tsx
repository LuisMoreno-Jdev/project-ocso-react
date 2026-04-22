import { createLocation } from "@/actions/locations/create";
import { API_URL, COOKIE_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";

export default async function FormNewLocation() {
  const cookieStore = await cookies();
    const rawCookie = cookieStore.get(COOKIE_NAME )?.value;
    if (!rawCookie) return null;
    let decodedCookie = decodeURIComponent(rawCookie);
    if (decodedCookie.startsWith('j:')) decodedCookie = decodedCookie.slice(2);
    const cookieData = JSON.parse(decodedCookie);
    const token = cookieData.token;
  const responseManagers = await axios.get(`${API_URL}/managers`, {
    headers: {
       Authorization: `Bearer ${token}` 
      }
  });
  const responseLocations = await axios.get(`${API_URL}/locations`, {
    headers: {
       Authorization: `Bearer ${token}` 
      }
  });


  return (
    <div className="w-full max-w-sm mt-10 animate-in fade-in zoom-in duration-500">
      <form 
        action={createLocation} 
        className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center gap-4"
      >
        {/* Contenedor del Input estilo "Tarjeta pequeña" */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-red-100">
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">
            Nombre
          </label>
          <input
            type="text"
            name="locationName"
            placeholder="Ej. OXXO CENTRO"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-300 px-1"
          />
        </div>
        
        <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-red-100">
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">
            Direccion
          </label>
          <input
            type="text"
            name="locationAddress"
            placeholder="Ej. Calle 123, Ciudad, Estado"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-300 px-1"
          />
        </div>

        <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-red-100">
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">
            Latitud
          </label>
          <input
            type="text"
            name="locationLat"
            placeholder="Ej. 12.3456789"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-300 px-1"
          />
        </div>

        <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-red-100">
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">
            Longitud
          </label>
          <input
            type="text"
            name="locationLng"
            placeholder="Ej. 123.456789"
            required
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder:text-gray-300 px-1"
          />
        </div>

        <SelectManager managers={responseManagers.data} locations={responseLocations.data}/>

        {/* Botón de envío con puntero y efecto hover */}
        <button
          type="submit"
          className="px-8 py-3 text-sm font-bold text-gray-700 hover:text-black hover:bg-gray-200 rounded-xl transition-all cursor-pointer active:scale-95"
        >
          SUBIR
        </button>
      </form>
    </div>
  );
}