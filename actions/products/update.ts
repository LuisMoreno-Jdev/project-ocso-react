"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProduct(productId: string, formData: FormData) {
    // Extracción limpia de datos
    const productData = {
        productName: formData.get("productName"),
        price: parseFloat(formData.get("price") as string),
        countSeal: parseInt(formData.get("countSeal") as string, 10),
        provider: formData.get("provider"), // El ID del selector
    };

    const resolvedHeaders = await authHeaders();
    
    const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PATCH",
        headers: {
            ...(resolvedHeaders as Record<string, string>),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (response.ok) { 
        // Revalidamos los tags y el path específico para ver los cambios
        revalidateTag("dashboard:products", "max");
        revalidatePath(`/dashboard/products/${productId}`);
        
        // Redireccionamos a la lista o al detalle
        redirect(`/dashboard/products/${productId}`);
    } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
        // Podrías retornar el error aquí para mostrarlo en el cliente
        return errorData;
    }
}