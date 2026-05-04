import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import CreateManagerModal from "./_components/CreateManager";

import FormCreateManager from "./_components/FormCreateManager";

const Managers = async () => {  
    const resolvedHeaders = await authHeaders();
    const responseManagers = await fetch(`${API_URL}/managers`, {
        method: "GET",
        headers: {
            ...(resolvedHeaders as Record<string, string>),
            "Content-Type": "application/json",
        }
    });

    const data: Manager[] = await responseManagers.json();

    return (
        <CreateManagerModal >
            <FormCreateManager />
        </CreateManagerModal>
    )
}

export default Managers;