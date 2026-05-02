import updateManager from "@/actions/managers/update";
import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SelectStore from "./SelectStore";

export default async function FormUpdateManager({manager}: { manager: Manager }) {
    // Obtenemos las tiendas para el selector
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/locations`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
        },
      })
    const stores = await response.json();

    // Esta es la función que se ejecutará en el cliente/servidor
    const handleUpdate = async (formData: FormData) => {
        "use server";
        await updateManager(manager.managerId, formData);
    };

  return (
    <div className="w-full">
      <form
        action={handleUpdate}
        className="bg-orange-400 py-6 px-6 flex flex-col gap-6 w-full rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl text-white text-center font-extrabold uppercase tracking-tight">
          Actualizar Manager
        </h1>
        
        <div className="flex flex-col gap-4 bg-white/10 p-6 rounded-xl border border-white/20">
          {/* Input Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">
              Nombre Completo
            </label>
            <input
              name="managerFullName"
              placeholder="Nombre completo"
              defaultValue={manager.managerFullName}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              required
            />
          </div>

          {/* Input Email */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">
              Correo Electrónico
            </label>
            <input
              name="managerEmail"
              type="email"
              placeholder="correo@oxxo.com"
              defaultValue={manager.managerEmail}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              required
            />
          </div>

          <div className="flex gap-4">
            {/* Input Salario */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">
                Salario
              </label>
              <input
                name="managerSalary"
                type="number"
                step="0.01"
                placeholder="0.00"
                defaultValue={manager.managerSalary}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
                required
              />
            </div>

            {/* Input Teléfono */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">
                Teléfono
              </label>
              <input
                name="managerPhoneNumber"
                placeholder="442..."
                defaultValue={manager.managerPhoneNumber}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
                required
              />
            </div>
          </div>

          {/* Selector de Tienda */}
          <div className="flex flex-col gap-1 w-full">
            <SelectStore 
                stores={stores} 
                defaultStore={manager.location?.locationId} 
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg uppercase tracking-wider"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}