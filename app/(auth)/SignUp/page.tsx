"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        // Lógica de registro...
        setSubmitting(false);
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-orange-500 px-10 py-8 rounded-[20px] flex flex-col gap-4 max-w-md w-full shadow-xl"
        >
            <h1 className="text-white text-4xl font-bold text-center mb-2 my-4">
                Registrarse
            </h1>
            
            <div className="flex flex-col gap-3 my-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-white ml-1">Email</label>
                    <input 
                        type="email" 
                        placeholder="ejemplo@correo.com"  
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-white ml-1">Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Contraseña"  
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-white ml-1">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Confirmar Contraseña"  
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 mt-4">
                <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-4 bg-blue-600 text-white font-bold text-xl rounded-full hover:bg-blue-700 transition-colors shadow-lg disabled:bg-blue-400"
                >
                    {submitting ? "Registrando..." : "Registrarse"}
                </button>

                <p className="text-white text-sm">
                    ¿Ya tienes una cuenta? 
                    <Link href="/Login" className="text-red-600 font-extrabold underline ml-1">
                        Inicia sesión
                    </Link> aquí.
                </p>
            </div>
        </form>
    );
}