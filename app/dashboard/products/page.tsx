import createProduct from "@/actions/products/create";
import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, InputGroup, Label } from "@heroui/react";
import { LuDollarSign } from "react-icons/lu";
import Select_Provider from "./_components/Select_Provider";

const ProductsPage = async () => {
  const resolvedHeaders = await authHeaders();
  const responseProvider = await fetch(`${API_URL}/providers`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: ["dashboard:products"],
    }
  });
  const providers: Provider[] = await responseProvider.json();

  return (
    /* bg-orange-600 es el naranja fuerte, rounded-3xl y p-10 para el estilo del contenedor */
    <div className="w-full flex justify-center py-10">
      <form 
        action={createProduct} 
        className="w-full max-w-4xl bg-orange-600 p-10 rounded-3xl flex flex-col gap-4 shadow-2xl"
      >
        <h2 className="text-white text-3xl font-bold text-center mb-2">
          Agregar Producto
        </h2>
        
        <div className="flex flex-col gap-4">
          
          {/* Nombre del Producto */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
            <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
              Nombre del Producto
            </Label>
            <InputGroup className="w-full">
              <InputGroup.Input
                name="productName"
                placeholder="Ingrese el nombre"
                className="w-full"
                required
              />
            </InputGroup>
          </div>

          {/* Precio del Producto */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
            <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
              Precio del Producto
            </Label>
            <InputGroup className="w-full flex items-center">
              <InputGroup.Input
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full"
                required
              />
              <div className="pr-3 flex items-center justify-center">
                <LuDollarSign size="20" className="text-gray-400" />
              </div>
            </InputGroup>
          </div>

          {/* Sellos del Producto */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
            <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
              Cantidad de Sellos
            </Label>
            <InputGroup className="w-full">
              <InputGroup.Input
                name="countSeal"
                type="number"
                placeholder="Ingrese la cantidad de sellos"
                className="w-full"
                required
              />
            </InputGroup>
          </div>

          {/* Proveedor - IMPORTANTE: Asegúrate que el componente Select no tenga anchos fijos internos */}
          <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
            <Select_Provider providers={providers} />
          </div>

        </div>

        <Button
          type="submit"
          className="w-full mt-2 py-7 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
        >
          Guardar Producto
        </Button>
      </form>
    </div>
  );
};

export default ProductsPage;