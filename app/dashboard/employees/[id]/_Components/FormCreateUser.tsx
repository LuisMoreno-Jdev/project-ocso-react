'use client';

import registerEmployee from "@/actions/users/register-employee";
import { Employee } from "@/entities";
import { Button, Input, Label } from "@heroui/react";
import { generate } from "generate-password";
import { useState } from "react";
import { LuEye } from "react-icons/lu"; // Asegúrate de tener instalado react-icons

export default function FormCreateUserEmployee({ employee }: { employee: Employee }) {
  const [userPassword, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { employeeId } = employee;
  const registerEmployeeById = registerEmployee.bind(null, employeeId);

  // Funciones para controlar la visibilidad
  const handleShowPassword = () => setVisible(true);
  const handleHidePassword = () => setVisible(false);

  return (
    <form action={registerEmployeeById} className="flex flex-col gap-4">
      <h2 className="text-white text-3xl font-semibold text-center mb-2">
        Crear Usuario
      </h2>
      
      <div className="flex flex-col gap-2">
        {/* Email Input */}
        <div className="w-full bg-white rounded-2xl p-2">
          <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
            Email del Empleado
          </Label>
          <Input 
            name="userEmail" 
            type="email" 
            placeholder="Ingrese el email" 
            required 
            className="bg-transparent"
          />
        </div>

        {/* Password Input con Botón de Ojo */}
        <div className="w-full bg-white rounded-2xl p-2 flex items-end gap-2">
          <div className="flex-grow">
            <Label className="block text-xs font-bold text-gray-500 mb-0.5 ml-1">
              Password del Empleado
            </Label>
            <Input 
              name="password" 
              type={visible ? "text" : "password"} 
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)} // Permite escribir manualmente
              placeholder="Ingrese la password" 
              required 
              className="bg-transparent"
            />
          </div>
          
          {/* Botón Trigger de Visibilidad */}
          <button
            type="button"
            className="p-2 mb-1 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
            onMouseDown={handleShowPassword}
            onMouseUp={handleHidePassword}
            onMouseLeave={handleHidePassword} // Por seguridad si el mouse sale del botón
          >
            <LuEye size="20" />
          </button>
        </div>

        {/* Generador de Password */}
        <div className="w-full bg-white rounded-2xl p-2">
          <Button 
            type="button" 
            className="w-full bg-orange-100 text-orange-600 font-semibold"
            onPress={() => {
              setPassword(generate({
                length: 10,
                numbers: true
              }))
            }}
          >
            Generar una contraseña
          </Button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="text-white font-bold w-full mt-2"
        variant="primary"
      >
        Crear Usuario Empleado
      </Button>
    </form>
  );
}