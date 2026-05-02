import { Provider } from "@/entities";
import { Card, CardContent, CardHeader, CardTitle, Separator } from "@heroui/react";

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <Card className="max-w-[350px] w-full shadow-sm border border-gray-200">
            <CardHeader className="flex px-4 py-3">
                <CardTitle className="text-lg font-semibold text-gray-800">
                    {provider.providerName}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-1 px-4 py-3 text-gray-600">
                <p className="text-sm">
                    Correo electrónico:
                </p>
                <span className="font-bold text-black">{provider.providerEmail}</span>
                <p className="text-sm">
                    Numero de teléfono:
                </p>
                <span className="font-bold text-black">{provider.providerPhoneNumber}</span>
                {
                    provider.products ? ( 
                        <p className="text-sm">
                            Tiene <span className="font-bold text-black">{provider.products.length}</span> productos
                        </p>
                    ) : <p className="text-sm text-gray-400">No tiene productos</p>
                }
            </CardContent>
        </Card>
    )
}