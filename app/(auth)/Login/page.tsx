"use client";
import { API_URL } from "@/constants";
import { Button, Input, Link } from "@heroui/react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Añade el tipo al evento
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget); // Usa currentTarget, es más seguro en React
    const authData = Object.fromEntries(formData.entries()); // Forma limpia de convertir FormData a Objeto

    try {
        const response = await axios.post(`${API_URL}/auth/login`, authData, {
            withCredentials: true
        });

        // NestJS por defecto devuelve 201 para POST exitosos, así que esto está bien
        if (response.status === 201 || response.status === 200) {
            router.push("/dashboard");
        }
    } catch (error: any) {
        console.error("Error en login:", error.response?.data || error.message);
        // Aquí podrías setear un estado de error para mostrar un mensaje al usuario
    } finally {
        setSubmitting(false); // Se ejecuta tanto si sale bien como si sale mal
    }
    };
    return (
        <form className="bg-orange-500 px-10 py-8 rounded-md flex flex-col gap-4 max-w-md w-full" onSubmit={handleSubmit}>
            
            <h1 className="text-white text-3xl font-bold text-center mb-2 my-4">
                Iniciar sesión
            </h1>
            
            {/* Wrapper to stack the label and input neatly */}
            <div className="flex flex-col gap-2 my-4">
                <label className="text-sm font-semibold text-white">Email</label>
                <Input 
                    name="userEmail"
                    type="email" 
                    placeholder="ejemplo@correo.com"  
                    required 
                />
                <label className="text-sm font-semibold text-white">Contraseña</label>
                <Input 
                    name="password"
                    type="password" 
                    placeholder="Contraseña"  
                    required 
                />
            </div>
            
            <div className="flex flex-col items-center gap-2">
            
            <Button type="submit" isDisabled={submitting} size="md" className="w-full font-bold mt-2">
                {submitting ? "Enviando..." : "Iniciar sesión"}
            </Button>

            <p className="text-white">¿No tienes una cuenta? <Link href="/SignUp" className="text-red-600 underline">Registrate</Link> aquí.</p>
            </div>
            
        </form>
    )
}