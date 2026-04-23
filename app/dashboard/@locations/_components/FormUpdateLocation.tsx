import { updateLocation } from "@/actions/locations/update";
import { API_URL } from "@/constants";
import { Location, Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SelectManager from "./SelectManager";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FormUpdateLocation({ searchParams }: Props) {
  const params = await searchParams;
  const storeId = Array.isArray(params.store) ? params.store[0] : params.store;

  if (!storeId) return null;

  const resolvedHeaders = await authHeaders();
  const updateWithStoreId = updateLocation.bind(null, storeId);

  const commonFetchOptions = {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>), //
      "Content-Type": "application/json",
    },
  };

  const [responseManagers, responseLocations] = await Promise.all([
    fetch(`${API_URL}/managers`, { ...commonFetchOptions, next: { tags: ["dashboard:managers"] } }),
    fetch(`${API_URL}/locations`, { ...commonFetchOptions, next: { tags: ["dashboard:locations"] } }),
  ]);

  const dataManagers: Manager[] = await responseManagers.json();
  const dataLocations: Location[] = await responseLocations.json();

  const foundLocation = dataLocations.find((location) => location.locationId === +storeId);
  const foundManager = dataManagers.find((manager) => manager.managerId === foundLocation?.manager?.managerId);

  return (
    <div className="w-full">
      <form
        action={updateWithStoreId}
        className="bg-orange-400 py-4 px-4 flex flex-col gap-6 w-full"
      >
        <h1 className="text-3xl text-white text-center font-extrabold uppercase tracking-tight">
          Actualizar Tienda
        </h1>

        <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
          {/* Input Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">Nombre</label>
            <input
              name="locationName"
              placeholder="Nombre de la tienda"
              defaultValue={foundLocation?.locationName}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
            />
          </div>

          {/* Input Dirección */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">Dirección</label>
            <input
              name="locationAddress"
              placeholder="Dirección completa"
              defaultValue={foundLocation?.locationAddress}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
            />
          </div>

          <div className="flex gap-4">
            {/* Input Latitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">Latitud</label>
              <input
                name="locationLat"
                placeholder="0.000"
                defaultValue={foundLocation?.locationLatLng[0]?.toString()}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              />
            </div>

            {/* Input Longitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">Longitud</label>
              <input
                name="locationLng"
                placeholder="0.000"
                defaultValue={foundLocation?.locationLatLng[1]?.toString()}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              />
            </div>
          </div>
        </div>

        <SelectManager 
          defaultManager={foundManager?.managerId} 
          managers={dataManagers} 
          locations={dataLocations} 
        />

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg uppercase tracking-wider"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}