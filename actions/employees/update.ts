"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateEmployee(employeeId: string, formData: FormData) {
  const resolvedHeaders = await authHeaders();
  
  // Clonamos los headers y eliminamos MANUALMENTE cualquier rastro de Content-Type
  // para que el fetch asigne correctamente el boundary de FormData
  const headers = { ...(resolvedHeaders as Record<string, string>) };
  delete headers["Content-Type"]; 

  const dataToSend = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "employeePhoto") {
      if (value instanceof File && value.size > 0) {
        dataToSend.append("file", value); // 'file' debe coincidir con el Interceptor
      }
    } else if (!key.startsWith("$")) {
      dataToSend.append(key, value);
    }
  }

  const response = await fetch(`${API_URL}/employees/${employeeId}`, {
    method: "PATCH",
    headers: headers,
    body: dataToSend, // Al ser FormData, el navegador pone multipart/form-data automáticamente
  });

  if (!response.ok) {
    // Si el error dice "Unexpected token -", el backend falló antes de devolver un JSON válido
    const textError = await response.text(); 
    try {
      const errorData = JSON.parse(textError);
      console.error("Error al actualizar (JSON):", errorData);
    } catch {
      console.error("Error crítico del servidor (No es JSON):", textError);
    }
    return;
  }

  revalidateTag("dashboard:employees", "max");
  revalidateTag(`dashboard:employees:${employeeId}`, "max");
  
  redirect(`/dashboard/employees/${employeeId}`);
}