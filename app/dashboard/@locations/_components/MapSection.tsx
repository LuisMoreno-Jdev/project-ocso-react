"use client"; // Esencial para que dynamic(ssr: false) funcione
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./StoreMap"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-xs text-gray-400">
            Cargando mapa...
        </div>
    )
});

interface MapSectionProps {
    lat: number;
    lng: number;
    storeName: string;
}

export default function MapSection({ lat, lng, storeName }: MapSectionProps) {
    return (
        <div className="w-full h-64 border-b border-gray-200 overflow-hidden">
            <MapWithNoSSR lat={lat} lng={lng} storeName={storeName} />
        </div>
    );
}