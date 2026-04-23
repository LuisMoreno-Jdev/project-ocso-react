import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import FormNewLocation from "./_components/FormNewLocation";
import LocationCard from "./_components/LocationCard";
import SelectLocation from "./_components/selectLocation";

interface Props {
  searchParams: Promise<{ store?: string }>;
}

const LocationsPage = async ({ searchParams }: Props) => {
  // 1. Resolución de parámetros de búsqueda (store ID)
  const resolvedParams = await searchParams;
  const store = resolvedParams.store;

  let locations: Location[] = [];

  // 2. Lógica de obtención de datos para el selector
  try {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/locations`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      next: {
        tags: ["dashboard:locations"],
      },
    });
    let data: Location[] = await response.json();
    locations = data;
  } catch (error) {
    console.error("Error cargando ubicaciones:", error);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-10 bg-[#fdf8f6]">
      {/* Selector de Tienda */}
      <div className="w-full max-w-md px-4">
        <SelectLocation locations={locations} store={store} />
      </div>

      {/* Carta de Manager y Mapa */}
      <div className="w-full max-w-2xl px-4 mt-10">
        <LocationCard store={store} />
      </div>

      {/* Formulario de Nueva Ubicación (Debajo de la carta) */}
      <div className="w-full flex justify-center px-4">
        <FormNewLocation searchParams={searchParams} />
      </div>
      <DeleteLocationButton store={store} />
    </div>
  );
};

export default LocationsPage;
