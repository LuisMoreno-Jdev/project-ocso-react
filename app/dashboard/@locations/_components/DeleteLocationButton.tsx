import DeleteLocation from "@/actions/locations/delete";
import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return null;

  return (
    <form action={DeleteLocation}>
      {/* Agregamos este input para mandar el ID a la acción */}
      <input type="hidden" name="locationId" value={store} />

      <button className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center">
        <LuTrash size="28" />
      </button>
    </form>
  );
}
