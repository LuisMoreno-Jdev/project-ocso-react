"use client";
import { API_URL } from "@/constants";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const authData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(authData),
                credentials: "include",
            });

            if (response.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                const errorData = await response.json();
                const errorMessage = Array.isArray(errorData.message) 
                    ? errorData.message.join(", ") 
                    : errorData.message;
                alert("Error: " + errorMessage);
            }
        } catch (error: any) {
            alert("Error de conexión con el servidor.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form 
            className="bg-orange-500 px-10 py-8 rounded-[20px] flex flex-col gap-4 max-w-md w-full shadow-xl" 
            onSubmit={handleSubmit}
        >
            <h1 className="text-white text-4xl font-bold text-center mb-2 my-4">
                Iniciar sesión
            </h1>
            
            <div className="flex flex-col gap-4 my-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white ml-1">Email</label>
                    <input 
                        name="userEmail"
                        type="email" 
                        placeholder="ejemplo@correo.com"  
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white ml-1">Contraseña</label>
                    <input 
                        name="password"
                        type="password" 
                        placeholder="Contraseña"  
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
                    {submitting ? "Cargando..." : "Iniciar sesión"}
                </button>

                <p className="text-white text-sm">
                    ¿No tienes una cuenta? 
                    <Link href="/SignUp" className="text-red-600 font-extrabold underline ml-1">
                        Regístrate
                    </Link> aquí.
                </p>
            </div>
        </form>
    );
}