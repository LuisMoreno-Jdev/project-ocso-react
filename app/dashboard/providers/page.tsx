import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Link } from "@heroui/react";
import { LuPlus } from "react-icons/lu";
import ProviderCard from "./_components/ProviderCard";

const Providers = async () => {
  const resolvedHeaders = await authHeaders();

  const response = await fetch(`${API_URL}/providers/`, {
    method: "GET",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
  });

  const providers: Provider[] = await response.json();

  return (
    <div className="w-full flex flex-col h-[90vh] p-6">
      <div className="w-full flex justify-end mb-4 px-4">
        <Button className="font-bold shadow-lg flex items-center gap-2">
          <LuPlus size="20" />
        </Button>
      </div>
      <div className="w-4/12 flex flex-wrap gap-4 px-4">
        {providers.map((provider: Provider) => (
          <Link
            key={provider.providerId}
            href={`/dashboard/providers/${provider.providerId}`}
            className="w-full hover:scale-[1.1] transition-transform active:scale-[0.98] no-underline"
            >
            <ProviderCard provider={provider} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Providers;