import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-orange-200 w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <Image 
          src="/OXXO-Logo.wine.png" 
          alt="Logo de Ocso" 
          width={400} 
          height={150} // Es recomendable poner un height proporcional para evitar saltos de layout
          priority // Esto ayuda a que el logo cargue más rápido en la pantalla de login
        />
        {children}
      </div>
    </div>
  );
}