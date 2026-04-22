import { API_URL } from "@/constants";
import { Location } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";
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
    const cookieStore = await cookies();
    const rawCookie = cookieStore.get("auth_for_ocso")?.value;

    if (rawCookie) {
        let decodedCookie = decodeURIComponent(rawCookie);
        if (decodedCookie.startsWith('j:')) {
            decodedCookie = decodedCookie.slice(2);
        }
        const cookieData = JSON.parse(decodedCookie);
        const token = cookieData.token;

        const { data } = await axios.get<Location[]>(`${API_URL}/locations`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        locations = data;
    }
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
        <FormNewLocation />
      </div>

    </div>
  );
};

export default LocationsPage;