"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProvider(providerId: string, formData: FormData) {
    let provider: any = {};
    
    for (const key of formData.keys()) {
        // SOLUCIÓN: Ignorar propiedades internas de Next.js que empiezan con $
        if (!key.startsWith("$")) {
            provider[key] = formData.get(key);
        }
    }
    
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: "PATCH",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    });

    if (response.ok) { 
        revalidateTag("dashboard:providers", "max");
        revalidateTag(`dashboard:providers:${providerId}`, "max");
        
        // Redirigimos para refrescar la vista
        redirect(`/dashboard/providers/${providerId}`);
    } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
    }
}