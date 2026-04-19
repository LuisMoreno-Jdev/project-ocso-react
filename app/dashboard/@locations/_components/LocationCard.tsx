import { API_URL } from "@/constants";
import { Location } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link"; // Importante para la redirección

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
    if (!store || store === "undefined") return null;

    try {
        const cookieStore = await cookies();
        const rawCookie = cookieStore.get("auth_for_ocso")?.value;
        if (!rawCookie) return null;

        let decodedCookie = decodeURIComponent(rawCookie);
        if (decodedCookie.startsWith('j:')) decodedCookie = decodedCookie.slice(2);
        const cookieData = JSON.parse(decodedCookie);
        const token = cookieData.token;

        const { data } = await axios.get<Location>(`${API_URL}/locations/${store}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return (
            /* w-full y max-w-2xl para que sea más larga que el selector */
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 flex flex-col overflow-hidden w-full max-w-2xl transition-all animate-in fade-in duration-500">
                
                {/* SECCIÓN SUPERIOR: NOMBRE DE TIENDA */}
                <div className="px-8 py-5 border-b-2 border-gray-200 bg-white">
                    <p className="text-xl text-gray-900 font-extrabold uppercase tracking-tight">
                        {data.locationName}
                    </p>
                </div>

                {/* SECCIÓN INFERIOR: MANAGER CON REDIRECCIÓN */}
                <div className="px-8 py-5 bg-white">
                    <p className="text-lg text-gray-700">
                        Manager: {" "}
                        {data.manager ? (
                            <Link 
                                href="/dashboard/managers" 
                                className="font-bold text-black hover:text-red-600 transition-colors cursor-pointer"
                            >
                                {data.manager.managerFullName}
                            </Link>
                        ) : (
                            <span className="font-bold text-red-600 italic">
                                Sin manager asignado
                            </span>
                        )}
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        return <div className="text-red-400 text-sm italic">Error al cargar ubicación.</div>;
    }
}