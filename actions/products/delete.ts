"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProduct(productId: string, formData: FormData) {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200){
        revalidateTag("dashboard:products", "max");
        revalidatePath("/dashboard/products");
        redirect("/dashboard/products");
    }

}