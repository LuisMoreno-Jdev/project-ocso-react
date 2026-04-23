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
  // VALIDACIÓN CRÍTICA: Si no hay store o es el valor por defecto de "no selección", desaparece.
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

    // Verificamos que existan coordenadas antes de renderizar el mapa
    const lat = data.locationLatLng?.[0];
    const lng = data.locationLatLng?.[1];

    return (
      <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 flex flex-col overflow-hidden w-full max-w-2xl transition-all animate-in slide-in-from-bottom-4 duration-700">
        {/* CABECERA: Nombre de la tienda */}
        <div className="px-10 pt-8 pb-4">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            {data.locationName}
          </h2>
        </div>

        {/* CUERPO: Información de Manager y Dirección */}
        <div className="px-10 pb-6 space-y-1">
          <p className="text-xl text-gray-800">
            <span className="font-medium text-gray-400">Manager: </span>
            <span className="font-bold">
              {data.manager ? (
                <Link
                  href="/dashboard/managers"
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

        {/* MAPA: Referencia visual al final */}
        {lat !== undefined && lng !== undefined && (
          <div className="px-6 pb-6">
            <div className="rounded-[1.5rem] overflow-hidden border-2 border-gray-100 shadow-inner h-72 w-full">
              <MapSection lat={lat} lng={lng} storeName={data.locationName} />
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return null; // En caso de error (ej. ID inválido), ocultamos la tarjeta.
  }
}
