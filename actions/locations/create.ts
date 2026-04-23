"use server";
import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
  let location: any = {};
  let locationLatLng = [0, 0];

  for (const key of formData.keys()) {
    const value = formData.get(key);

    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        // Aquí 'managerId' se guardará como 'managerId'
        // que es lo que pide tu DTO específicamente.
        location[key] = value;
      }
    }
  }

  location.locationLatLng = locationLatLng;

  // LOG PARA VERIFICAR: Debe decir "managerId": "UUID..."
  console.log("Objeto enviado al backend:", JSON.stringify(location, null, 2));

  try {
    const resolvedHeaders = await authHeaders();

    const response = await fetch(`${API_URL}/locations`, {
      method: "POST",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });

    const {locationId}: Location = await response.json();
    if (response.status === 201) {
      revalidateTag("dashboard:locations", "");
      redirect(`/dashboard?store=${locationId}`);
    }
    revalidatePath("/dashboard/locations");
  } catch (error: any) {
    console.error("Error del Servidor:", error.message);
  }
}
