'use client';

import { Employee, Location } from "@/entities";
import type { Key } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeePhotoCard from "./EmployeePhotoCard";

export default function ListEmployees({ employees, locations }: { employees: Employee[], locations: Location[] }) {
    // Mantenemos el estado como string para el filtrado
    const [filter, setFilter] = useState<string>("");

    return (
        <>
            <Select
                name="location"
                className="w-full min-w-[85vw]"
                placeholder="Selecciona una tienda"
                onChange={(key: Key | null) => {
                    // Si seleccionan "Todos" (id="all") o limpian el select, reseteamos el filtro
                    if (key !== null && key !== "all") {
                        setFilter(String(key));
                    } else {
                        setFilter("");
                    }
                }}
            >
                <Label className="text-xs font-bold text-black ml-1">Tienda</Label>

                <Select.Trigger className="w-full bg-white rounded-2xl p-3 border border-transparent transition-all focus-within:ring-2 focus-within:ring-orange-200">
                    <Select.Value className="text-gray-700" />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        {/* Opción para ver todas las tiendas */}
                        <ListBox.Item id="all" textValue="Todas las tiendas" className="font-bold border-b border-gray-100">
                            Todas las tiendas
                        </ListBox.Item>
                        
                        {locations.map((store: Location) => (
                            <ListBox.Item
                                key={store.locationId}
                                id={String(store.locationId)}
                                textValue={store.locationName}
                            >
                                {store.locationName}
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>

            <div className="flex flex-wrap gap-4 mt-4 overflow-y-auto">
                {employees
                    .filter((employee: Employee) => {
                        // LÓGICA DE FILTRO:
                        // Si el filtro es un string vacío (porque elegimos "Todos" o no hay nada), devolvemos true.
                        if (!filter || filter === "all") return true;
                        
                        // De lo contrario, comparamos IDs
                        return String(employee.location?.locationId) === filter;
                    })
                    .map((employee: Employee) => {
                        const hasValidPhoto =
                            employee.employeePhoto !== null &&
                            employee.employeePhoto !== undefined &&
                            employee.employeePhoto !== "null" &&
                            employee.employeePhoto !== "";

                        return hasValidPhoto ? (
                            <EmployeePhotoCard key={employee.employeeId} employee={employee} />
                        ) : (
                            <EmployeeCard key={employee.employeeId} employee={employee} />
                        );
                    })}
            </div>
        </>
    );
}