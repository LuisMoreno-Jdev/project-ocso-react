import { API_URL, COOKIE_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

const CountPage = async () => {
    try {
        // 1. Await necesario en Next.js 15/16
        const cookieStore = await cookies(); 
        
        // 2. Asegúrate de que 'CookieName' sea el string correcto (ej. "token" o "session")
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (!token) {
            return <div className="p-4">No hay sesión activa</div>;
        }

        const response = await axios.get(`${API_URL}/locations`, {
            headers: {
                // Asegúrate de que tu backend de NestJS espere el formato Bearer
                'Authorization': `Bearer ${token}`
            }
        });

        const count = response.data.length;
        const cantidadTiendas = count > 1 ? "tiendas" : "tienda";
        return (
            <div className="w-2/12">
                <p>Hay: {count} {cantidadTiendas}</p>
            </div>
        )
    } catch (error: any) {
        // 3. Log para saber qué falló (CORS, 401 Unauthorized, etc.)
        console.error("Error en CountPage:", error.response?.status || error.message);
        return <div className="p-4">Error cargando conteo</div>;
    }
}

export default CountPage;