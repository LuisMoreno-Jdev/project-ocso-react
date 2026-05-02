import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";

const Products = async () => {
  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: ["dashboard:products"],
    }
  });
  const products: Product[] = await response.json();
    return (
        <div className="w-[450px] h-[90vh]">
            <FilteredCards products={products} />
        </div>
    )
}

export default Products;