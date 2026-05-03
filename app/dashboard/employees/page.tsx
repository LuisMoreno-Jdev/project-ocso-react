import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./_components/EmployeeCard";
import EmployeePhotoCard from "./_components/EmployeePhotoCard";

const Employees = async () => {
  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/employees`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    cache: 'no-store', // Fuerza a pedir datos frescos para descartar temas de caché
    next: {
      tags: [`dashboard:employees`],
    }
  });
  
  const employees = await response.json();

  return (
    <div className="flex flex-wrap h-[90vh] gap-6 overflow-y-auto p-10 justify-start itesms-start">
      {employees.map((employee: Employee) => {
        // Validación robusta: que no sea null, que no sea undefined y que no sea el string "null"
        const hasValidPhoto = 
            employee.employeePhoto !== null && 
            employee.employeePhoto !== undefined && 
            employee.employeePhoto !== "null" &&
            employee.employeePhoto !== "";

        return hasValidPhoto ? (
          <EmployeePhotoCard key={employee.employeeId} employee={employee} />
        ) : (
          <EmployeeCard key={employee.employeeId} employee={employee} />
        );
      })}
    </div>
  );
};

export default Employees;