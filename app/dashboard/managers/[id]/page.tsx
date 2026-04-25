import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import MapSection from "../../@locations/_components/MapSection";

export default async function ManagerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/managers/${id}`, {
      method: "GET",
      headers: {
          ...(resolvedHeaders as Record<string, string>),
          "Content-Type": "application/json",
      },
      next: {
          tags: [`dashboard:managers:${id}`, "dashboard:managers"]
      }
  });
  const data: Manager = await response?.json();
   
  return (
    <div className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="w-full max-w-2xl">
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border border-orange-100 flex flex-col overflow-hidden transition-all duration-300 hover:border-orange-200">
              
              <div className="px-10 py-8 border-b border-orange-50 bg-white text-center">
                <p className="text-xs text-orange-500 uppercase font-black tracking-[0.2em] mb-3">
                  Manager Autorizado
                </p>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                  {data.managerFullName}
                </h2>
              </div>

              <div className="px-10 py-8 flex flex-col items-center gap-4 bg-orange-50/10">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-medium text-gray-800 italic">{data.managerEmail || "N/A"}</p>
                </div>
                
                <div className="w-16 h-[1px] bg-orange-100"></div>

                <div className="text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Teléfono</p>
                  <p className="text-2xl font-black text-gray-900">{data.managerPhoneNumber || "---"}</p>
                </div>
              </div>

              <div className="px-10 pb-10 flex flex-col gap-6">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Ubicación Asignada</p>
                  <p className="text-lg text-gray-700 font-medium">
                    {data.location?.locationAddress || "Sin dirección asignada"}
                  </p>
                </div>

                {data.location ? (
                  // Div del mapa con contorno rojo agregado
                  <div className="rounded-[2rem] overflow-hidden border-4 border-red-500 shadow-2xl h-80 w-full transform transition-transform hover:scale-[1.02] duration-500">
                    <MapSection 
                      lat={data.location.locationLatLng?.[0]} 
                      lng={data.location.locationLatLng?.[1]} 
                      storeName={data.location.locationName} 
                    />
                  </div>
                ) : (
                  <div className="py-10 border-2 border-dashed border-orange-100 rounded-[2rem] text-center">
                    <p className="text-gray-400 italic font-medium">No hay mapa disponible para este manager</p>
                  </div>
                )}
              </div>
            </div>
        </div>
    </div>
  )
}