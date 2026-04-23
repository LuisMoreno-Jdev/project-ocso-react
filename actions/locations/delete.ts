"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteLocation(formData: FormData) {
  const locationId = formData.get("locationId"); // Asegúrate de que coincida con el name del input
  if (!locationId) return;

  try {
    // CAMBIO: Agrega await para que la acción sea síncrona con el proceso
    const resolvedHeaders = await authHeaders();
    await fetch(`${API_URL}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
    });
    revalidateTag("dashboard:locations", "");
    // Refresca la ruta para que la tienda desaparezca de la lista
    revalidatePath("/dashboard/locations");
    redirect("/dashboard");
  } catch (error) {
    console.error("Error al eliminar:", error);
  }

  return; // Devuelve void de forma explícita
}
