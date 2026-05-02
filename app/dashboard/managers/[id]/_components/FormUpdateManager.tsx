import updateManager from "@/actions/managers/update";
import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SelectStore from "./SelectStore";

export default async function FormUpdateManager({manager}: { manager: Manager }) {
    const updateManagerById = updateManager.bind(null, manager.managerId);
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/locations`, {
      method: "GET",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
        },
      })
    const stores = await response.json();
  return (
    <div className="w-full">
      <form
        action={updateManagerById}
        className="bg-orange-400 py-4 px-4 flex flex-col gap-6 w-full"
      >
        <h1 className="text-3xl text-white text-center font-extrabold uppercase tracking-tight">
          Actualizar Manager
        </h1>
        <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
          {/* Input Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">
              Nombre
            </label>
            <input
              name="managerFullName"
              placeholder="Nombre completo"
              defaultValue={manager.managerFullName}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
            />
          </div>

          {/* Input Dirección */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-xs font-bold ml-1 uppercase">
              Manager Email
            </label>
            <input
              name="managerEmail"
              placeholder="Correo electrónico"
              defaultValue={manager.managerEmail}
              className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
            />
          </div>
          <div className="flex gap-4">
            {/* Input Latitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">
                Manager Salary
              </label>
              <input
                name="managerSalary"
                placeholder="0.000"
                defaultValue={manager.managerSalary}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              />
            </div>

            {/* Input Longitud */}
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-white text-xs font-bold ml-1 uppercase">
                Manager Phone Number
              </label>
              <input
                name="managerPhoneNumber"
                placeholder="0.000"
                defaultValue={manager.managerPhoneNumber}
                className="w-full p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-inner"
              />
            </div>
          </div>
          <SelectStore stores={stores} />
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