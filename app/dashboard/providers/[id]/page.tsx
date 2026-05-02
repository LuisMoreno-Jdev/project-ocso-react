import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Link } from "@heroui/react";
import FormUpdateProvider from "./_components/FormUpdateProvider";
import ProductCard from "./_components/ProductCard";
import ProviderCard from "./_components/ProviderCard";

// Definimos la interfaz para que TypeScript sepa que params es una Promesa
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProvidersPage({ params }: Props) {
  const { id } = await params;
  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/providers/${id}`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    next: {
      tags: [`dashboard:providers:${id}`],
    }
  });
  if (!response.ok) {
    return (
      <div className="p-10">
        <h1 className="text-red-500 font-bold">Error: No se pudo cargar el proveedor.</h1>
      </div>
    );
  }
  const provider: Provider = await response.json();
  return (
    <div className="flex flex-grow-0 flex-wrap pl-10 gap-10 h-[90vh] pt-10">
        <ProviderCard provider={provider} />
        <FormUpdateProvider provider={provider} />
        <div className="h-1 bg-orange-900 w-[85vw]"/>
          <div className="flex flex-wrap gap-10">
        {
          provider.products.map((product: Product) => (
            <Link key={product.productId} href={`/dashboard/products/${product.productId}`} className="hover:scale-[1.1] transition-transform active:scale-[0.98] no-underline">            
            <ProductCard product={product} />
            </Link>
          ))
        }
          </div>
    </div>
  );
}