"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProduct(formData: FormData) {
    // Extraemos los valores individualmente para asegurar limpieza
    const name = formData.get("productName");
    const priceRaw = formData.get("price");
    const sealRaw = formData.get("countSeal");
    const providerId = formData.get("provider");

    const product = {
        productName: name,
        price: parseFloat(String(priceRaw)) || 0,
        countSeal: parseInt(String(sealRaw), 10) || 0,
        provider: String(providerId), // Se envía el ID seleccionado como string
    };

    const resolvedHeaders = await authHeaders();
    
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();
    console.log("Respuesta de la API:", result);

    if (response.status === 201) {
        revalidateTag("dashboard:products", "max");
        revalidatePath("/dashboard/products");
        redirect("/dashboard/products");
    } else {
        return result;
    }
}