import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const authHeaders = cache(async () => {
    try {
        const cookieStore = await cookies(); 
        const rawCookie = cookieStore.get(COOKIE_NAME)?.value;

        if (!rawCookie) return {}; 

        let decodedCookie = decodeURIComponent(rawCookie);
        
        // Manejo del prefijo 'j:' que pone express-session/cookie-parser
        if (decodedCookie.startsWith('j:')) {
            decodedCookie = decodedCookie.slice(2);
        }
        
        const cookieData = JSON.parse(decodedCookie);
        const token = cookieData.token;

        if (!token) return {};

        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    } catch (error) {
        console.error("Error en authHeaders:", error);
        return {};
    }
});