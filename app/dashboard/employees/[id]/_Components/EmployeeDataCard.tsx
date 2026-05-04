import { Employee } from "@/entities";
import Image from "next/image";
import Link from "next/link";
import DeleteEmployee from "./DeleteEmployee";

export default function EmployeeDataCard({ employee }: { employee: Employee }){
    const hasPhoto = employee.employeePhoto && employee.employeePhoto !== "null";
  const photoUrl = hasPhoto 
    ? `http://127.0.0.1:4000/employees/photos/${employee.employeePhoto}`
    : "/default-avatar.png"; 

    return(
      <div className="flex flex-row items-stretch shadow-2xl rounded-[2.5rem] overflow-hidden border-3 border-orange-400 bg-white gap-2">
        
        {/* Lado Izquierdo: Datos */}
        <div className="size-72 flex flex-col items-center justify-center p-6 bg-white">
           <h1 className="text-2xl font-bold text-center text-gray-800 leading-tight">
             {employee.employeeName} {employee.employeeLastName}
           </h1>
           <div className="mt-4 space-y-1 py-5">
             <p className="text-center text-gray-500 text-sm italic">{employee.employeeEmail}</p>
             <p className="text-center text-orange-600 font-medium">{employee.employeePhoneNumber}</p>
             {employee.location ? (
                <Link href={`/dashboard?store=${employee.location.locationId}`}>
                    <p className="text-center text-gray-400 text-xs uppercase font-bold tracking-wider hover:text-orange-500 transition-colors underline decoration-orange-300 cursor-pointer">
                        {employee.location.locationName}
                    </p>
                </Link>
                ) : (
                <p className="text-center text-gray-400 text-xs italic">Sin ubicación</p>
              )}
           </div>
           <div>
              <DeleteEmployee employeeId={employee.employeeId} />
           </div>
        </div>

        {/* LÍNEA DIVISORA VERTICAL */}
        <div className="w-[2px] bg-orange-200 my-8" /> 

        {/* Lado Derecho: Imagen */}
        <div className="relative size-72 flex-shrink-0 overflow-hidden">
          <Image 
            src={photoUrl} 
            alt={`Foto de ${employee.employeeName}`}
            fill 
            sizes="288px"
            className="object-cover hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        </div>
      </div>
    )
}