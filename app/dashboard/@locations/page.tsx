import { API_URL } from "@/constants";
import { Location } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";
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
    /* Contenedor principal: 
       - justify-start y pt-10: Mueve todo arriba con el margen de 10 solicitado.
       - flex-col e items-center: Centra los elementos horizontalmente.
    */
    <div className="w-full h-screen flex flex-col items-center justify-start pt-10">
      
      {/* 3. SECTOR SELECTOR (Más corto)
          Se limita a max-w-md para que no se vea excesivamente ancho.
      */}
      <div className="w-full max-w-md px-4">
        <SelectLocation locations={locations} store={store} />
      </div>

      {/* 4. SECTOR CARTA DE MANAGER (Más ancho)
          Se usa max-w-2xl y mt-10 para dar el efecto de la imagen donde 
          la carta sobresale del ancho del selector.
      */}
      <div className="w-full max-w-2xl px-4 mt-10">
        <LocationCard store={store} />
      </div>

    </div>
  );
};

export default LocationsPage;