import Image from "next/image";

export default function Header() {
    return (
        <div className="w-screen h-[10vh] bg-orange-200 flex flex-row items-center px-10">
            <Image src="/OXXO-Logo.wine.png" alt="Logo de Ocso" width={200} height={200} draggable={false}/>
        </div>
    )
}