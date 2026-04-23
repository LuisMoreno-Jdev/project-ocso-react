import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import FormNewLocation from "./_components/FormNewLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";
import LocationCard from "./_components/LocationCard";
import UpdateLocation from "./_components/UpdateLocation";
import SelectLocation from "./_components/selectLocation";

interface Props {
  searchParams: Promise<{ store?: string }>;
}

const LocationsPage = async ({ searchParams }: Props) => {
  // 1. Resolución de parámetros de búsqueda (Next.js 15)
  const resolvedParams = await searchParams;
  const store = resolvedParams.store;

  let locations: Location[] = [];

  // 2. Obtención de datos con headers tipados
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
    locations = await response.json();
  } catch (error) {
    console.error("Error cargando ubicaciones:", error);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-10 pb-20 bg-[#fdf8f6] gap-8">
      
      {/* Selector de Tienda */}
      <div className="w-full max-w-md px-4">
        <SelectLocation locations={locations} store={store} />
      </div>

      {/* Sección de Información de la Tienda y Acciones */}
      <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6">
        {/* Carta de Manager y Mapa */}
        <LocationCard store={store} />

        {/* Contenedor de Botones (Separados de la carta) */}
        <div className="flex flex-col items-center gap-4 w-full">
          <DeleteLocationButton store={store} />
          
          <UpdateLocation>
            <FormUpdateLocation searchParams={searchParams} />
          </UpdateLocation>
        </div>
      </div>

      {/* Separador visual opcional */}
      <hr className="w-full max-w-md border-gray-200" />

      {/* Formulario de Nueva Ubicación (Al final con su propio espacio) */}
      <div className="w-full flex justify-center px-4 mb-10">
        <FormNewLocation searchParams={searchParams} />
      </div>
      
    </div>
  );
};

export default LocationsPage;