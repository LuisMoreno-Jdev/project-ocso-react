import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { CreateEmployeeModal } from "./_components/CreateEmployee";
import FormEmployeeContainer from "./_components/FormEmployeeContainer";
import ListEmployees from "./_components/ListEmployees";

const Employees = async () => {
  const resolvedHeaders = await authHeaders();
  const responseEmployees = await fetch(`${API_URL}/employees`, {
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
  const responseLocations = await fetch(`${API_URL}/locations`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    }
  });
  
  const employees = await responseEmployees.json();
  const locations = await responseLocations.json();

  return (
    <div className="flex flex-wrap h-[90vh] gap-6 overflow-y-auto p-10 justify-start itesms-start">
      <ListEmployees employees={employees} locations={locations} />
      <div className="absolute bottom-10 right-10">
          <CreateEmployeeModal>
            <FormEmployeeContainer />
          </CreateEmployeeModal>
        </div>
    </div>
  );
};

export default Employees;