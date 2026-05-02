'use client'

import { Product } from "@/entities";
import { Input, Link } from "@heroui/react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FilteredCards({products}: {products: Product[]}) {
    const [filtered, setFiltered] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);
    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            if(product.productName.toLowerCase().includes(filtered.toLowerCase())){
                return true;
            }else return false;
        })
        console.log(filteredProducts)
        setProductsList(filteredProducts)
    }, [filtered])
    return (
        <div className="h-full min-h-[90vh] flex flex-col gap-6 border-r-orange-400 border-2 px-10 pt-10 overflow-y-auto">
        <Input
        className="w-[350px]"
        placeholder="Nombre del producto"
        onChange={(e) => {
            setFiltered(e.target.value)
        }}/>
            {
                productsList.map((product: Product) => {
                    return (
                        <Link 
                        className="hover:scale-110 transition-transform no-underline"
                        key={product.productId} 
                        href={`/dashboard/products/${product.productId}`}>
                            <ProductCard product={product} />
                        </Link>
                    )
                })
            }
        </div>
    )
}