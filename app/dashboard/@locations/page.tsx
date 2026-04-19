import { API_URL } from "@/constants";
import { Location } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";
import SelectLocation from "./_components/selectLocation";

interface Props {
  searchParams: Promise<{ store?: string }>;
}

const LocationsPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const store = resolvedParams.store;

  let locations: Location[] = [];

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
    /* h-screen y justify-start para mantener el selector arriba con pt-10 */
    <div className="w-full h-screen flex flex-col items-center justify-start pt-10">
      
      <div className="w-full max-w-md px-4 flex flex-col">
        {/* Solo dejamos el selector aquí. 
            Las cartas de la izquierda se cargarán desde donde 
            hayas puesto el componente EmployeesLocation originalmente. */}
        <SelectLocation locations={locations} store={store} />
        
        {/* Se eliminó el div de EmployeesLocation que estaba aquí abajo */}
      </div>
    </div>
  );
};

export default LocationsPage;