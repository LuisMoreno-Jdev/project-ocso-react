import Link from "next/link";

import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function ManagerCards() {
  try {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/managers/`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      next: { tags: ["dashboard:managers"] },
    });

    const data: Manager[] = await response.json();

    if (!data || data.length === 0) {
      return (
        <div className="w-full h-[90vh] max-h-[90vh] pt-20 text-center">
          <p className="text-gray-400 italic">Sin managers registrados.</p>
        </div>
      );
    }

    return (
      <div className="w-full h-[90vh] max-h-[90vh] overflow-y-auto flex flex-col items-center gap-6 p-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-black text-gray-900 uppercase self-start mb-4 max-w-4xl mx-auto w-full tracking-tighter">
          Managers del Sistema
        </h1>

        <div className="w-full max-w-4xl flex flex-col gap-6">
          {data.map((manager: Manager) => (
            <div key={manager.managerId} className="w-full mb-4 px-2">
              <Link
                href={`/dashboard/managers/${manager.managerId}`}
                className="block w-full outline-none"
              >
                <div
                  className="w-full bg-white rounded-[1.5rem] shadow-sm border border-orange-100 flex flex-col 
                    transition-all duration-300 ease-in-out transform 
                    hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50 hover:border-blue-300"
                >
                  <div className="px-6 py-4 border-b border-orange-50 rounded-t-[1.5rem]">
                    <p className="text-[10px] text-orange-600 uppercase font-black tracking-widest mb-1">
                      Manager Autorizado
                    </p>
                    <h2 className="text-xl font-bold text-gray-900">
                      {manager.managerFullName}
                    </h2>
                  </div>

                  <div className="px-6 py-5 bg-orange-50/10 rounded-b-[1.5rem]">
                    <p className="text-sm text-gray-600 font-medium italic">
                      {manager.managerEmail || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full h-[90vh] p-10 text-center text-red-500 font-bold">
        Error al cargar managers.
      </div>
    );
  }
}
