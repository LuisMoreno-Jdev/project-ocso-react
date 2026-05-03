'use client';

import { Employee } from "@/entities";
import { Button, Card, CardFooter, CardHeader, Link } from "@heroui/react";
import Image from "next/image";

export default function EmployeePhotoCard({ employee }: { employee: Employee }) {
  const hasPhoto = employee.employeePhoto && employee.employeePhoto !== "null";
  
  const photoUrl = hasPhoto 
    ? `http://127.0.0.1:4000/employees/photos/${employee.employeePhoto}`
    : "/default-avatar.png"; 

  return (
    <Card className="relative size-72 max-h-72 shadow-lg border-none overflow-hidden group">
      {/* 1. Imagen de fondo */}
      <Image 
        src={photoUrl} 
        alt={`Foto de ${employee.employeeName}`}
        fill 
        sizes="300px"
        className="object-cover z-0"
        unoptimized
      />

      {/* 2. Capa de degradado */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* 3. Header: Nombre */}
      <CardHeader className="absolute top-0 z-20 flex-col items-start p-4">
        <h1 className="font-bold text-xl text-white drop-shadow-md">
          {`${employee.employeeName} ${employee.employeeLastName}`}
        </h1>
      </CardHeader>
      
      {/* 4. Footer: Botón con borde y fondo traslúcido */}
      <CardFooter className="absolute bottom-0 z-20 w-full p-4 justify-start">
        <Link 
          href={`/dashboard/employees/${employee.employeeId}`}
          className="no-underline"
        >
          <Button 
            variant="ghost" 
            className="w-fit bg-white/20 backdrop-blur-md text-white border-white/50 rounded-xl hover:bg-white/40"
          >
            Actualizar datos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}