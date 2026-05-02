"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function createProvider(formData: FormData) {
    let provider: any = {};
    for (const key of formData.keys()) {
        provider[key] = formData.get(key);
    }
    
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/providers`, {
      method: "POST",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    });

    if (response.status === 201) {
        // Revalidamos los tags para el fetch
        revalidateTag("dashboard:providers", "max");
        // Forzamos la revalidación de la ruta completa para que el servidor mande HTML nuevo
        revalidatePath("/dashboard/providers");
    }
}