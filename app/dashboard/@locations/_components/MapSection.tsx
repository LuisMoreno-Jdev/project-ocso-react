"use client";
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
            {/* Añadir 'key' es el truco definitivo: 
                Cuando lat o lng cambian, el componente se remonta por completo.
            */}
            <MapWithNoSSR 
                key={`${lat}-${lng}`} 
                lat={lat} 
                lng={lng} 
                storeName={storeName} 
            />
        </div>
    );
}