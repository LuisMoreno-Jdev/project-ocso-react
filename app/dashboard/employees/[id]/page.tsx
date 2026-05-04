import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeDataCard from "./_Components/EmployeeDataCard";
import FormUpdateEmployee from "./_Components/FormUpdateEmployee";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EmployeePage({ params }: Props) {
  const { id } = await params;
  const resolvedHeaders = await authHeaders();
  
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: [`dashboard:employees:${id}`],
    }
  });

  if (!response.ok) return <div className="p-10 text-red-500">Error al cargar empleado</div>;

  const employee = await response.json();

  return (
    <div className="w-full min-h-[90vh] flex p-10 gap-10 justify-center items-center">
      <EmployeeDataCard employee={employee} />
      <FormUpdateEmployee employee={employee} />
    </div>
  );
}