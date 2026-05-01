import deleteManager from "@/actions/managers/delete";
import { LuTrash } from "react-icons/lu";
export default async function DeleteManagerButton({ managerId }: { managerId: string }) {
    const deleteByManagerId = deleteManager.bind(null, managerId);
    return (
        <form action={deleteByManagerId}>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center">
        <LuTrash size="20" />
      </button>
        </form>
    )
}