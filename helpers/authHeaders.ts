import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const authHeaders = cache(async () => {
    const cookieStore = await cookies(); // Correcto: await para Next.js 15
    const rawCookie = cookieStore.get(COOKIE_NAME)?.value;

    // En lugar de lanzar Error (que puede romper el renderizado), 
    // devolvemos un objeto vacío si no hay sesión.
    if (!rawCookie) return {}; 

    try {
        let decodedCookie = decodeURIComponent(rawCookie);
        if (decodedCookie.startsWith('j:')) decodedCookie = decodedCookie.slice(2);
        
        const cookieData = JSON.parse(decodedCookie);
        const token = cookieData.token;

        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    } catch (error) {
        console.error("Error parseando la cookie de auth:", error);
        return {};
    }
});