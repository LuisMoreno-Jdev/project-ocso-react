"use client";
import { Button, Input, Link } from "@heroui/react";

export default function SignUpPage() {
    return (
        <div className="bg-orange-500 px-10 py-8 rounded-md flex flex-col gap-4 max-w-md w-full">
            
            <h1 className="text-white text-3xl font-bold text-center mb-2 my-4">
                Registrarse
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
                <label className="text-sm font-semibold text-white">Confirmar Contraseña</label>
                <Input 
                    type="password" 
                    placeholder="Confirmar Contraseña"  
                    required 
                />
            </div>
            
            <div className="flex flex-col items-center gap-2">
            
            <Button size="md" className="w-full font-bold mt-2">
                Registrarse
            </Button>

            <p className="text-white">¿Ya tienes una cuenta? <Link href="/Login" className="text-red-600 underline">Inicia sesión</Link> aquí.</p>
            </div>
            
        </div>
    );
}