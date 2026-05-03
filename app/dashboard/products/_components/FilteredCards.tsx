'use client'

import { Product, Provider } from "@/entities";
import { Input, Link, ListBox, Select } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FilteredCards({products, providers}: {products: Product[], providers: Provider[]}) {
    const [filtered, setFiltered] = useState<string>("");
    const [providerId, setProviderId] = useState<string | null>("todos");
    const [productsList, setProductsList] = useState<Product[]>(products);

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            // 1. Filtro de nombre
            const matchesName = product.productName.toLowerCase().includes(filtered.toLowerCase());
            
            // 2. Filtro de proveedor (Si es "todos" o null, pasan todos)
            const matchesProvider = !providerId || providerId === "todos" || product.provider.providerId === providerId;
            
            // DEBE SER && para que se apliquen ambos filtros a la vez
            return matchesName && matchesProvider;
        })
        setProductsList(filteredProducts);
    }, [filtered, providerId, products])

    return (
        <div className="h-full min-h-[90vh] flex flex-col gap-8 px-10 pt-10">
        
        <Select 
            placeholder="Selecciona un proveedor"
            /* Según la doc de HeroUI v3, se usa value y onChange directamente en el Select */
            value={providerId}
            onChange={(val) => setProviderId(val as string)}
        >
            <Select.Trigger>
                <Select.Value>
                    {/* Renderizamos el nombre manualmente para asegurar que cambie el texto del botón */}
                    {providerId === "todos" || !providerId 
                        ? "Todos los proveedores" 
                        : providers.find(p => p.providerId === providerId)?.providerName
                    }
                </Select.Value>
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                {/* En v3, el ListBox hereda la selección del Select padre */}
                <ListBox>
                    <ListBox.Item id="todos" textValue="todos" className="text-sm">
                        Todos los proveedores
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    {
                        providers.map((p) => (
                            <ListBox.Item 
                                id={p.providerId} 
                                key={p.providerId}
                                textValue={p.providerName} 
                                className="text-sm"
                            >
                                {p.providerName}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))
                    }
                </ListBox>
            </Select.Popover>
        </Select>

        <Input
            className="w-[350px]"
            placeholder="Nombre del producto"
            value={filtered}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFiltered(e.target.value)
            }}
        />

        <div className="flex flex-col gap-4 pb-10">
            {
                productsList.map((product: Product) => (
                    <Link 
                        className="hover:scale-105 transition-transform no-underline"
                        key={product.productId} 
                        href={`/dashboard/products/${product.productId}`}>
                        <ProductCard product={product} />
                    </Link>
                ))
            }
            {productsList.length === 0 && (
                <p className="text-center text-gray-400 mt-10">No se encontraron productos.</p>
            )}
        </div>
        </div>
    )
}