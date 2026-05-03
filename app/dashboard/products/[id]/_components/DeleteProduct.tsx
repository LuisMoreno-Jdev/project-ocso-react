import deleteProduct from "@/actions/products/delete";
import { Button } from "@heroui/react";
import { LuTrash } from "react-icons/lu";

export default function DeleteProduct({ productId }: { productId: string }) {
    const deleeteProductById = deleteProduct.bind(null, productId)
  return (
    <form action={deleeteProductById}>
        <Button type="submit" variant="danger" className="w-[150px] h-[40px]">
            <LuTrash size="20" />
        </Button>
    </form>
  );
}