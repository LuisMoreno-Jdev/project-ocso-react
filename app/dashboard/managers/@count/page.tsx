import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function CountManagersPage() {
  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/managers`, { // Asumo que necesitas todos para contar
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: ["dashboard:managers"]
    }
  });

  if (!response.ok) return <div className="text-red-500">Error cargando estadísticas</div>;

  const managers: Manager[] = await response.json();
  const countNoStore = managers.filter((m: Manager) => !m.location).length;
  let salarySum = managers.reduce((acc, m) => acc + (m.managerSalary || 0), 0);
  const maxSalary = managers.length > 0 
    ? Math.max(...managers.map(m => m.managerSalary || 0)) 
    : 0;

  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-[1.5rem] shadow-sm border border-orange-100">
      <div className="text-center">
        <p className="text-xs font-black uppercase text-orange-500 tracking-tighter">Total Managers</p>
        <p className="text-3xl font-bold text-gray-800">{managers.length}</p>
      </div>
      <div className="text-center border-x border-orange-50">
        <p className="text-xs font-black uppercase text-orange-500 tracking-tighter">Sin Tienda</p>
        <p className="text-3xl font-bold text-gray-800">{countNoStore}</p>
      </div>
      <div className="text-center">
        <p className="text-xs font-black uppercase text-orange-500 tracking-tighter">Salario Máximo</p>
        <p className="text-3xl font-bold text-green-600">${maxSalary.toLocaleString()}</p>
      </div>
      <div className="text-center">
        <p className="text-xs font-black uppercase text-orange-500 tracking-tighter">Salario Promedio</p>
        <p className="text-3xl font-bold text-green-600">${(salarySum / managers.length).toLocaleString()}</p>
      </div>
    </div>
  );
}