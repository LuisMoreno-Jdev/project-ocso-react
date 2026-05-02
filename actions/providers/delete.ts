"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProvider(providerId: string) {
    const resolvedHeaders = await authHeaders();
    
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: "DELETE",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
        revalidateTag("dashboard:providers", "max");
        redirect("/dashboard/providers");
    } else {
        console.error("Error al borrar el proveedor");
    }
}