import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { Location, Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SelectManager from "./SelectManager";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FormUpdateLocation({ searchParams }: Props) {
  // 1. Resolvemos searchParams (Requisito de Next.js 15)
  const params = await searchParams;
  const storeId = Array.isArray(params.store) ? params.store[0] : params.store;

  // Si no hay storeId seleccionado en la URL, no renderizamos el formulario
  if (!storeId) return null;

  const resolvedHeaders = await authHeaders();

  const commonFetchOptions = {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
  };

  // 2. Obtenemos los datos necesarios de la API
  const [responseManagers, responseLocations] = await Promise.all([
    fetch(`${API_URL}/managers`, { ...commonFetchOptions, next: { tags: ["dashboard:managers"] } }),
    fetch(`${API_URL}/locations`, { ...commonFetchOptions, next: { tags: ["dashboard:locations"] } }),
  ]);

  const dataManagers: Manager[] = await responseManagers.json();
  const dataLocations: Location[] = await responseLocations.json();

  // 3. Buscamos la tienda y su manager actual para el valor por defecto
  const foundLocation = dataLocations.find((location) => location.locationId === +storeId);
  const foundManager = dataManagers.find((manager) => manager.managerId === foundLocation?.manager?.managerId);

  return (
    <div className="w-full max-w-md mt-10 animate-in fade-in zoom-in duration-500">
      <form
        action={createLocation}
        className="bg-orange-400 py-6 px-4 flex flex-col gap-6 w-full rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl text-white text-center font-bold">Actualizar Tienda</h1>

        <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl">
          {/* Input Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium ml-1">Nombre</label>
            <input
              name="locationName"
              placeholder="Ocso Jurikiya"
              defaultValue={foundLocation?.locationName}
              className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Input Dirección */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium ml-1">Dirección</label>
            <input
              name="locationAddress"
              placeholder="Av De La Luz S/N"
              defaultValue={foundLocation?.locationAddress}
              className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          <div className="flex gap-2">
            {/* Input Latitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-sm font-medium ml-1">Latitud</label>
              <input
                name="locationLat"
                placeholder="-120"
                defaultValue={foundLocation?.locationLatLng[0]?.toString()}
                className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {/* Input Longitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-sm font-medium ml-1">Longitud</label>
              <input
                name="locationLng"
                placeholder="20"
                defaultValue={foundLocation?.locationLatLng[1]?.toString()}
                className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* 4. Selector de Manager con la implementación de defaultManager */}
        <SelectManager 
          defaultManager={foundManager?.managerId} 
          managers={dataManagers} 
          locations={dataLocations} 
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-transform active:scale-95 shadow-md"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}