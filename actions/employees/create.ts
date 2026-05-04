"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function createEmployee(prevState: any, formData: FormData) {
    const resolvedHeaders = await authHeaders();
    
    const dataToSend = new FormData();

    // 1. Campos simples
    dataToSend.append("employeeName", formData.get("employeeName") as string);
    dataToSend.append("employeeLastName", formData.get("employeeLastName") as string);
    dataToSend.append("employeeEmail", formData.get("employeeEmail") as string);
    dataToSend.append("employeePhoneNumber", formData.get("employeePhoneNumber") as string);

    // 2. LA LLAVE DEL ÉXITO: Para que class-validator vea un objeto
    // Enviamos el campo con la notación de objeto: location[locationId]
    const locationId = formData.get("location");
    if (locationId) {
        dataToSend.append("location[locationId]", String(locationId));
    }

    // 3. El archivo
    const file = formData.get("employeePhoto") as File;
    if (file && file.size > 0) {
        dataToSend.append("file", file); // Debe llamarse 'file' para el Interceptor del back
    }

    const headers = { ...(resolvedHeaders as Record<string, string>) };
    delete headers["Content-Type"]; // IMPORTANTE: Dejar que el navegador ponga el boundary

    try {
        const response = await fetch(`${API_URL}/employees`, {
            method: "POST",
            headers: headers,
            body: dataToSend,
        });

        const result = await response.json();

        if (response.ok) {
            revalidateTag("dashboard:employees", "max");
            revalidatePath("/dashboard/employees");
            return { success: true, error: null };
        }

        // Manejo de errores de NestJS
        const errorMessage = Array.isArray(result.message) 
            ? result.message.join(", ") 
            : result.message;

        return { success: false, error: errorMessage };
    } catch (e) {
        return { success: false, error: "Error de conexión" };
    }
}