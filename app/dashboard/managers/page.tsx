import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

const Managers = async () => {  
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/managers`, {
        method: "GET",
        headers: {
            ...(resolvedHeaders as Record<string, string>),
            "Content-Type": "application/json",
        }
    });
    const data: Manager[] = await response.json();

    return null;
}

export default Managers;