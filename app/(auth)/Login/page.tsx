"use client";
import { API_URL } from "@/constants";
import { Button, Input, Link } from "@heroui/react";
import axios from "axios";

export default function LoginPage() {
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let authData: any = {}
        authData.userEmail = formData.get("userEmail");
        authData.password = formData.get("password");
        const {data} = await axios.post(`${API_URL}/auth/login`, authData);
        console.log(data);
    }
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
            
            <Button type="submit" size="md" className="w-full font-bold mt-2">
                Iniciar sesión
            </Button>

            <p className="text-white">¿No tienes una cuenta? <Link href="/SignUp" className="text-red-600 underline">Registrate</Link> aquí.</p>
            </div>
            
        </form>
    )
}