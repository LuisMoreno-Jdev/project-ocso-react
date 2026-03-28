"use client";
import { Button, Input, Link } from "@heroui/react";

export default function LoginPage() {
    return (
        <div className="bg-orange-500 px-10 py-8 rounded-md flex flex-col gap-4 max-w-md w-full">
            
            <h1 className="text-white text-3xl font-bold text-center mb-2 my-4">
                Iniciar sesión
            </h1>
            
            {/* Wrapper to stack the label and input neatly */}
            <div className="flex flex-col gap-2 my-4">
                <label className="text-sm font-semibold text-white">Email</label>
                <Input 
                    type="email" 
                    placeholder="ejemplo@correo.com"  
                    required 
                />
                <label className="text-sm font-semibold text-white">Contraseña</label>
                <Input 
                    type="password" 
                    placeholder="Contraseña"  
                    required 
                />
            </div>
            
            <div className="flex flex-col items-center gap-2">
            
            <Button size="md" className="w-full font-bold mt-2">
                Iniciar sesión
            </Button>

            <p className="text-white">¿No tienes una cuenta? <Link href="/SignUp" className="text-red-600 underline">Registrate</Link> aquí.</p>
            </div>
            
        </div>
    )
}