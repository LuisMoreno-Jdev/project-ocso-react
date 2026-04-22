import DeleteLocation from "@/actions/locations/delete";

export default function DeleteLocationButton({ store }: { store: string | string[] | undefined }) {
    if (!store) return null;

    return (
        <form action={DeleteLocation}>
            {/* Agregamos este input para mandar el ID a la acción */}
            <input type="hidden" name="locationId" value={store} />
            
            <button 
                type="submit" 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
                Eliminar Tienda
            </button>
        </form>
    );
}