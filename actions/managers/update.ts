"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateManager(managerId: string, formData: FormData) {
    let manager: any = {};
    for (const key of formData.keys()) {
        manager[key] = formData.get(key);
    }

    manager.managerSalary = +manager.managerSalary;

    if (manager.locationId && manager.locationId !== "") {
        manager.location = +manager.locationId;
        delete manager.locationId;
    } else {
        delete manager.locationId;
        delete manager.location;
    }

    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
      method: "PATCH",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manager),
    });

    if (response.ok) { 
        // 1. Invalidamos la caché de forma agresiva
        revalidateTag("dashboard:managers", "max");
        revalidateTag(`dashboard:managers:${managerId}`, "max");
        
        // 2. FORZAMOS RECARGA: Redirigimos a la misma página. 
        // Esto cerrará el modal y actualizará los datos.
        redirect(`/dashboard/managers/${managerId}`);
    } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
    }
}