import MapSection from "@/app/dashboard/@locations/_components/MapSection";
import { Manager } from "@/entities";
import Link from "next/link";

interface ManagerCardProps {
  manager: Manager;
}

export default function ManagersCard({ manager }: ManagerCardProps) {
  return (
    <div className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-4xl">
        <div className="w-full bg-white rounded-[1.5rem] shadow-xl border border-gray-100 flex flex-col overflow-hidden">
          
          {/* Header - Título Centrado */}
          <div className="px-10 py-6 border-b border-gray-100 bg-white text-center">
            <h2 className="text-5xl font-bold text-gray-800 tracking-tight">
              {manager.managerFullName}
            </h2>
          </div>

          {/* Body - Layout Horizontal */}
          <div className="px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Información Izquierda */}
            <div className="flex flex-col gap-4 text-left w-full md:w-1/2">
              <p className="text-2xl text-gray-800">
                <span className="font-semibold">Email:</span> {manager.managerEmail || "N/A"}
              </p>
              <p className="text-2xl text-gray-800">
                <span className="font-semibold">Teléfono:</span> {manager.managerPhoneNumber || "---"}
              </p>
              <p className="text-2xl text-gray-800">
                <span className="font-semibold">Salario:</span> {manager.managerSalary || "---"}
              </p>
              <p className="text-2xl text-gray-800">
                <span className="font-semibold">Tienda:</span>{" "}
                {manager.location ? (
                  <Link 
                    href={{
                      pathname: `/dashboard`,
                      query: {
                        store: manager?.location?.locationId
                      }
                    }}
                    className="underline font-bold decoration-2 underline-offset-4 hover:text-orange-500 transition-colors"
                  >
                    {manager.location.locationName}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-500 italic text-xl">Sin tienda asignada</span>
                )}
              </p>
            </div>

            {/* Mapa Derecha */}
            <div className="w-full md:w-[450px]">
              {manager.location ? (
                <div className="rounded-xl overflow-hidden border-[3px] border-[#4a1c17] shadow-lg h-[280px] w-full transform transition-transform hover:scale-[1.02] duration-500">
                  <MapSection 
                    lat={manager.location.locationLatLng?.[0]} 
                    lng={manager.location.locationLatLng?.[1]} 
                    storeName={manager.location.locationName} 
                  />
                </div>
              ) : (
                <div className="h-[280px] w-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
                  <p className="text-gray-400 italic font-medium">Mapa no disponible</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}