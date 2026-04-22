'use server';

import { API_URL, COOKIE_NAME } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache"; // Importante para refrescar la UI
import { cookies } from "next/headers";

export default async function DeleteLocation(formData: FormData) {
    const locationId = formData.get("locationId"); // Asegúrate de que coincida con el name del input
    if (!locationId) return;
    
    const cookieStore = await cookies();
    const rawCookie = cookieStore.get(COOKIE_NAME)?.value;
    
    // CAMBIO: Usa return simple, no retornes null
    if (!rawCookie) return; 

    let decodedCookie = decodeURIComponent(rawCookie);
    if (decodedCookie.startsWith('j:')) decodedCookie = decodedCookie.slice(2);
    const cookieData = JSON.parse(decodedCookie);
    const token = cookieData.token;

    try {
        // CAMBIO: Agrega await para que la acción sea síncrona con el proceso
        await axios.delete(`${API_URL}/locations/${locationId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        
        // Refresca la ruta para que la tienda desaparezca de la lista
        revalidatePath("/dashboard/locations");
    } catch (error) {
        console.error("Error al eliminar:", error);
    }

    return; // Devuelve void de forma explícita
}