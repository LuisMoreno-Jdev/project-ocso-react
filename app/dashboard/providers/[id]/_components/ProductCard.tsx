import { Product } from "@/entities";
import { Card, CardContent, CardHeader, CardTitle, Separator } from "@heroui/react";

export default function ProductCard({product}: {product: Product}){
    return (
        <Card className="max-w-[350px] shadow-sm border border-gray-200">
            <CardHeader className="flex px-4 py-3">
                <CardTitle className="text-lg font-semibold text-gray-800">
                    {product.productName || "Producto"}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-1 px-4 py-3 text-gray-600">
                <p className="text-sm">Nombre del producto:</p>
                <span className="font-bold text-black">{product.productName}</span>
                
                <p className="text-sm">Precio del producto:</p>
                <span className="font-bold text-black">${product.price}</span>
                
                <p className="text-sm">Sellos del producto:</p>
                <span className="font-bold text-black">{product.countSeal}</span>
            </CardContent>
        </Card>
    )
}