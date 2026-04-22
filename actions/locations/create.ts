'use server';
import { API_URL, COOKIE_NAME } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createLocation(formData: FormData) {
    const cookieStore = await cookies();
    const rawCookie = cookieStore.get(COOKIE_NAME)?.value;
    
    if (!rawCookie) return; 

    const decodedCookie = decodeURIComponent(rawCookie);
    const cookieData = JSON.parse(decodedCookie.startsWith('j:') ? decodedCookie.slice(2) : decodedCookie);
    const token = cookieData.token;

    let location: any = {}
    let locationLatLng = [0, 0]

    for (const key of formData.keys()) {
        const value = formData.get(key);
        
        if (value) {
            if (key === 'locationLat') {
                locationLatLng[0] = +value;
            } else if (key === 'locationLng') {
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
        await axios.post(`${API_URL}/locations`, location, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        revalidatePath("/dashboard/locations");
    } catch (error: any) {
        console.error("Error del Servidor:", error.response?.data || error.message);
    }
}