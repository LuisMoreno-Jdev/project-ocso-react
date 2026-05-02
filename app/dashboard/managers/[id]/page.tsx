import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteManagerButton from "./_components/DeleteManagerButton";
import FormUpdateManager from "./_components/FormUpdateManager";
import ManagersCard from "./_components/ManagersCard";
import UpdateManager from "./_components/UpdateManager";

export default async function ManagerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const resolvedHeaders = await authHeaders();
  
  const response = await fetch(`${API_URL}/managers/${id}`, {
      method: "GET",
      headers: {
          ...(resolvedHeaders as Record<string, string>),
          "Content-Type": "application/json",
      },
      next: {
          tags: [`dashboard:managers:${id}`, "dashboard:managers"]
      }
  });

  if (!response.ok) {
    return <div className="p-10 text-center">Error al cargar el manager</div>;
  }

  const data: Manager = await response.json();
   
  return (
    <div className="w-full">
      <ManagersCard manager={data} />
      <div className="rounded-md px-10 py-2 flex items-center justify-center">
        <UpdateManager>
          <FormUpdateManager manager={data} />
        </UpdateManager>
        <DeleteManagerButton managerId={id} />
      </div>
    </div>
  );
}