import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function EmployeesLocation({
  store,
}: {
  store: string | string[] | undefined;
}) {
  // Estado inicial: Selección de tienda
  if (!store || store === "undefined") {
    return (
      /* Aplicamos h-[90vh] para mantener consistencia, pero alineamos al inicio */
      <div className="w-full h-[90vh] max-h-[90vh] flex flex-col items-center justify-start pt-20 px-6">
        <div className="w-full max-w-sm bg-white/50 border-2 border-dashed border-orange-200 rounded-[2rem] p-10 text-center">
          <p className="text-gray-500 font-medium italic">
            Selecciona una ubicación para gestionar los empleados
          </p>
        </div>
      </div>
    );
  }

  try {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/employees/location/${store}`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      next: { tags: ["dashboard:locations:employees"] }
    });

    const data: Employee[] = await response.json();

    if (!data || data.length === 0) {
      return (
        <div className="w-full h-[90vh] max-h-[90vh] pt-20 text-center">
          <p className="text-gray-400 italic">Sin empleados en esta ubicación.</p>
        </div>
      );
    }

    return (
      <div className="w-full h-[90vh] max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-4 p-6 animate-in fade-in duration-500">
        {data.map((employee: Employee) => {
          const fullName = `${employee.employeeName} ${employee.employeeLastName}`;
          return (
            <div
              key={employee.employeeId}
              /* w-full para que ocupe todo el ancho de su columna */
              className="w-full bg-white rounded-[1.5rem] shadow-sm border border-orange-100 flex flex-col overflow-hidden transition-all hover:shadow-md shrink-0"
            >
              <div className="px-6 py-4 border-b border-orange-50">
                <p className="text-[10px] text-orange-400 uppercase font-black tracking-widest mb-1">Empleado</p>
                <p className="text-lg font-bold text-gray-900">{fullName}</p>
              </div>
              <div className="px-6 py-4 flex flex-col gap-2 bg-orange-50/10">
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-400">Email:</span> {employee.employeeEmail || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-400">Tel:</span> {employee.employeePhoneNumber || "---"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full h-[90vh] p-10 text-center text-red-500 font-bold">
        Error al cargar empleados.
      </div>
    );
  }
}