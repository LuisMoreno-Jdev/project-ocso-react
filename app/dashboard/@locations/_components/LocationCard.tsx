import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import MapSection from "./MapSection";

export default async function LocationCard({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store || store === "undefined" || store === "") return null;

  try {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/locations/${store}`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      next: {
        tags: ["dashboard:locations", `dashboard:locations:${store}`],
      }
    });
    
    const data: Location = await response.json();

    // Verificamos que existan coordenadas
    const lat = data.locationLatLng?.[0];
    const lng = data.locationLatLng?.[1];

    if (lat === undefined || lng === undefined) return null;

    return (
      <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 flex flex-col overflow-hidden w-full max-w-2xl transition-all animate-in slide-in-from-bottom-4 duration-700">
        <div className="px-10 pt-8 pb-4">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            {data.locationName}
          </h2>
        </div>

        <div className="px-10 pb-6 space-y-1">
          <p className="text-xl text-gray-800">
            <span className="font-medium text-gray-400">Manager: </span>
            <span className="font-bold">
              {data.manager ? (
                <Link
                  href={`/dashboard/managers/${data.manager.managerId}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {data.manager.managerFullName}
                </Link>
              ) : (
                "Sin asignar"
              )}
            </span>
          </p>
          <p className="text-xl text-gray-800">
            <span className="font-medium text-gray-400">Dirección: </span>
            <span className="font-bold uppercase">
              {data.locationAddress || "Dirección no disponible"}
            </span>
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-[1.5rem] overflow-hidden border-2 border-gray-100 shadow-inner h-72 w-full">
            {/* Pasamos las coordenadas directamente */}
            <MapSection lat={lat} lng={lng} storeName={data.locationName} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error cargando la tienda:", error);
    return null;
  }
}
