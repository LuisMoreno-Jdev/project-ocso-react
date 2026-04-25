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
  alt="OXXO Logo"
  width={300} // Ajusta al tamaño que desees
  height={150} // Ajusta al tamaño que desees
  priority // Esto soluciona el aviso de LCP (sustituye a loading="eager")
  className="w-[200px] h-auto mx-auto mb-6" // 'h-auto' soluciona el aviso del aspect ratio
/>
        {children}
      </div>
    </div>
  );
}