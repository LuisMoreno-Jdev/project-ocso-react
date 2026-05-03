'use client';

import { Product } from "@/entities";
import { Card, CardHeader, CardTitle, Separator } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleProviderClick = (e: React.MouseEvent) => {
    // Evitamos que el click active el Link padre (el del producto)
    e.preventDefault();
    e.stopPropagation();
    router.push(`/dashboard/providers/${product.provider.providerId}`);
  };

  return (
    <Card className="w-full min-w-[350px] shadow-sm">
      <CardHeader className="flex flex-col items-start px-4 pt-4">
        <p className="text-tiny text-gray-500 uppercase font-bold">Producto</p>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {product.productName || "Sin nombre"}
        </CardTitle>
      </CardHeader>
      
      <Separator />
      
      <div className="flex flex-col gap-2 px-4 py-3 text-gray-600">
        <div>
          <p className="text-xs text-gray-400">Precio:</p>
          <span className="font-bold text-black text-base">${product.price}</span>
        </div>
        
        <div>
          <p className="text-xs text-gray-400">Sellos:</p>
          <span className="font-medium text-black">{product.countSeal}</span>
        </div>

        <div>
          <p className="text-xs text-gray-400">Proveedor:</p>
          <span 
            onClick={handleProviderClick}
            className="text-sm font-bold text-black underline text-base cursor-pointer transition-colors"
          >
            {product.provider.providerName}
          </span>
        </div>
      </div>
    </Card>
  );
}