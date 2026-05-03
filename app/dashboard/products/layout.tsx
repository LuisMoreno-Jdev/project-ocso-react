import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { ReactNode } from "react";
import FilteredCards from "./_components/FilteredCards";

const LayoutProducts = async ({ children }: { children: ReactNode }) => {
  const resolvedHeaders = await authHeaders();
  const responseProduct = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: ["dashboard:products"],
    }
  });
  const products: Product[] = await responseProduct.json();

  const responseProvider = await fetch(`${API_URL}/providers`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    }, 
    next: {
      tags: ["dashboard:providers"],
    }
  });
  const provider: Provider[] = await responseProvider.json();

    return (
        <div className="h-[90vh] w-full flex flex-row">
            <div className="w-3/12 overflow-y-auto h-full border-r-orange-400 border-2">
                <FilteredCards products={products} providers={provider} />
            </div>
            <div className="w-9/12">
                {children}
            </div>
        </div>
    )
}

export default LayoutProducts;
