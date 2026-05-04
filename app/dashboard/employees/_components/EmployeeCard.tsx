'use client';

import { Employee } from "@/entities";
import { Button, Card, CardContent, CardFooter, CardHeader, Link, Separator } from "@heroui/react";

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <Card className="relative size-72 max-h-72 shadow-sm border border-gray-200 flex flex-col bg-white bg-orange-50">
      
      <CardHeader className="flex px-4 py-3">
        <h1 className="font-bold text-xl text-gray-800">
          {`${employee.employeeName} ${employee.employeeLastName}`}
        </h1>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-2 px-4 py-3">
        <p className="text-sm text-gray-600">
          Correo: <b className="text-black">{employee.employeeEmail}</b>
        </p>
        <p className="text-sm text-gray-600">
          Número de teléfono: <b className="text-black">{employee.employeePhoneNumber}</b>
        </p>
      </CardContent>

      {/* Footer: Botón alineado a la izquierda con borde visible */}
      <CardFooter className="absolute bottom-0 w-full p-4 justify-start">
        <Link 
          href={`/dashboard/employees/${employee.employeeId}`}
          className="no-underline"
        >
          <Button 
            variant="ghost" 
            className="w-fit border-2 border-gray-300 text-gray-800 font-medium rounded-xl hover:bg-gray-150 transition-colors"
          >
            Actualizar datos
          </Button>
        </Link>
      </CardFooter>
      
    </Card>
  );
}