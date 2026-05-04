// dashboard/employees/_components/FormContainer.tsx (o similar)
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import FormCreateEmployee from "./FormCreateEmployee";

export default async function FormEmployeeContainer() {
  const resolvedHeaders = await authHeaders();
  
  // Obtenemos las tiendas desde el servidor usando las cookies/headers
  const response = await fetch(`${API_URL}/locations`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
    },
    next: { tags: ["locations"] }
  });

  const stores = await response.json();

  // Le pasamos los datos al componente de cliente
  return <FormCreateEmployee stores={stores} />;
}