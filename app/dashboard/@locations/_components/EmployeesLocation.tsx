import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    
    if (!store || store === "undefined") {
        return (
            /* Eliminamos h-full para que no se estire al centro de la pantalla */
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] p-8 text-center w-full">
                    <p className="text-gray-500 font-medium italic">
                        Selecciona una ubicación para gestionar los empleados
                    </p>
                </div>
            </div>
        );
    }

    let tokenValue: string | undefined = undefined;

    try {
        const cookieStore = await cookies();
        const rawCookie = cookieStore.get("auth_for_ocso")?.value;

        if (!rawCookie) {
            return <div className="p-4 text-xs font-bold text-red-500">Sesión expirada.</div>;
        }

        let decodedCookie = decodeURIComponent(rawCookie);
        if (decodedCookie.startsWith('j:')) {
            decodedCookie = decodedCookie.slice(2);
        }

        const cookieData = JSON.parse(decodedCookie);
        tokenValue = cookieData.token;

        const { data } = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
            headers: {
                Authorization: `Bearer ${tokenValue}`
            }
        });

        if (!data || data.length === 0) {
            return (
                <div className="p-10 text-center">
                    <p className="text-gray-400 italic">Sin empleados en esta ubicación.</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-4 p-4 bg-transparent font-sans animate-in fade-in duration-500">
                {data.map((employee) => {
                    const fullName = `${employee.employeeName} ${employee.employeeLastName}`;
                    return (
                        <div 
                            key={employee.employeeId} 
                            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden w-full max-w-md transition-transform hover:scale-[1.01]"
                        >
                            <div className="px-6 py-4 border-b border-gray-100">
                                <p className="text-lg text-gray-900">
                                    Nombre: <span className="font-bold">{fullName}</span>
                                </p>
                            </div>
                            <div className="px-6 py-4 flex flex-col gap-1">
                                <p className="text-lg text-gray-900">
                                    Email: <span className="font-bold">{employee.employeeEmail || "N/A"}</span>
                                </p>
                                <p className="text-lg text-gray-900">
                                    Teléfono: <span className="font-bold">{employee.employeePhoneNumber || "Sin número"}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } catch (error: any) {
        return (
            <div className="text-red-500 p-10 text-center font-bold">
                Error al conectar con el servidor.
            </div>
        );
    }
}