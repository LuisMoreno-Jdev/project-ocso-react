'use client'; // CRÍTICO: Necesario para que .bind y los componentes de HeroUI funcionen bien

import updateProduct from "@/actions/products/update";
import { Product, Provider } from "@/entities";
import { Button, InputGroup, Label } from "@heroui/react";
import { LuCheck, LuDollarSign } from "react-icons/lu";
import Select_Provider from "../../_components/Select_Provider";
import DeleteProduct from "./DeleteProduct";

export default function FormUpdateProduct({ product, providers }: { product: Product, providers: Provider[] }) {
    const { productId } = product;
    
    // El .bind ahora funcionará correctamente porque estamos en un Client Component
    const updateProductById = updateProduct.bind(null, productId);

    return (
        <div className="w-full flex flex-col justify-center py-10 px-4">
            <form 
                action={updateProductById} 
                className="w-full max-w-4xl bg-orange-400 p-10 rounded-3xl flex flex-col gap-4 shadow-2xl"
            >
                <h2 className="text-white text-3xl font-bold text-center mb-2">
                    Actualizar Producto
                </h2>
                
                <div className="flex flex-col gap-4">
                    
                    {/* Nombre del Producto */}
                    <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
                        <Label className="block text-xs font-bold text-black mb-0.5 ml-1">
                            Nombre del Producto
                        </Label>
                        <InputGroup className="w-full">
                            <InputGroup.Input
                                defaultValue={product.productName}
                                name="productName"
                                placeholder="Ingrese el nombre"
                                className="w-full border-none focus:ring-0"
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
                                defaultValue={product.price}
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full border-none focus:ring-0"
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
                                defaultValue={product.countSeal}
                                name="countSeal"
                                type="number"
                                placeholder="Ingrese la cantidad de sellos"
                                className="w-full border-none focus:ring-0"
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Proveedor */}
                    <div className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-300">
                        <Select_Provider 
                            providers={providers} 
                            defaultProvider={product.provider.providerId} 
                        />
                    </div>

                </div>

                <Button
                    type="submit"
                    className="w-full mt-2 py-7 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md uppercase"
                >
                    <LuCheck size="20" />
                </Button>
                
            </form>
            <div className="w-full h-[50px] bg-orange-400 rounded-3xl flex justify-center items-center">
                    <DeleteProduct productId={productId} />
            </div>
        </div>
    );
}