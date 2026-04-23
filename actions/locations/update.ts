"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLocation(store: string, formData: FormData) {
  let locationData: any = {};
  let locationLatLng = [0, 0];

  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        locationData[key] = value;
      }
    }
  }
  locationData.locationLatLng = locationLatLng;

  try {
    const resolvedHeaders = await authHeaders();

    const response = await fetch(`${API_URL}/locations/${store}`, {
      method: "PATCH",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar en el servidor");
    }

    // Limpieza agresiva de caché
    revalidateTag("dashboard:locations", "");
    revalidateTag("dashboard:managers", "");
    revalidatePath("/dashboard", "layout");
    revalidatePath(`/dashboard/locations`);

  } catch (error: any) {
    // Si Next.js lanza un redirect, hay que dejarlo pasar
    if (error.message === "NEXT_REDIRECT" || error.digest?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error en Server Action:", error.message);
    return; // No devolvemos nada para no romper el tipo del form action
  }

  // Redireccionamos a la misma tienda para forzar el refresco de los componentes
  redirect(`/dashboard?store=${store}`);
}