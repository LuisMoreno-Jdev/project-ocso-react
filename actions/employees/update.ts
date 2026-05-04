"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateEmployee(employeeId: string, formData: FormData) {
  const resolvedHeaders = await authHeaders();
  const headers = { ...(resolvedHeaders as Record<string, string>) };
  delete headers["Content-Type"]; 

  const dataToSend = new FormData();

  // Procesamos los campos manualmente para asegurar la estructura que el backend espera
  for (const [key, value] of formData.entries()) {
    if (key === "employeePhoto") {
      if (value instanceof File && value.size > 0) {
        dataToSend.append("file", value);
      }
    } else if (key === "location") {
      // TRANSFORMACIÓN CLAVE: Enviamos como objeto para el DTO de NestJS
      if (value) {
        dataToSend.append("location[locationId]", String(value));
      }
    } else if (!key.startsWith("$")) {
      dataToSend.append(key, value);
    }
  }

  const response = await fetch(`${API_URL}/employees/${employeeId}`, {
    method: "PATCH",
    headers: headers,
    body: dataToSend,
  });

  if (!response.ok) {
    const textError = await response.text(); 
    try {
      const errorData = JSON.parse(textError);
      console.error("Error al actualizar (JSON):", errorData);
    } catch {
      console.error("Error crítico del servidor (No es JSON):", textError);
    }
    return; // Podrías retornar un objeto de error aquí para mostrarlo en el UI
  }

  // Si llegamos aquí, la actualización fue exitosa
  revalidateTag("dashboard:employees", "max");
  revalidateTag(`dashboard:employees:${employeeId}`, "max");
  
  redirect(`/dashboard/employees/${employeeId}`);
}