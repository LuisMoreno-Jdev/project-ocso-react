import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ProductCard from "../_components/ProductCard";
import FormUpdateProduct from "./_components/FormUpdateProduct";

export default async function ProductPage({ params }: {params: {id:string}}) {
  const { id } = await params;
  const resolvedHeaders = await authHeaders();
  const responseProduct = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    }
  });
  const responseProvider = await fetch(`${API_URL}/providers/`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    }
  });
  const product: Product = await responseProduct.json();
  const providers: Provider[] = await responseProvider.json();

  return (
    <div className="flex flex-wrap justify-center mt-10 justify-space-evenly items-center gap-10 max-h-[90vh]">
        <div className="w-[350px]">
            <ProductCard product={product} />
        </div>
        <div className="w-[400px] h-[500px]">
            <FormUpdateProduct product={product} providers={providers} />
        </div>
    </div>
  )
}