'use client';
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";



export default function LayoutDashboard({
    children, locations,
}: Readonly<{
        children: ReactNode;
        locations: ReactNode;
    }>) {
      const path = usePathname();
  return (
    <div className="w-screen h-screen bg-orange-50"> 
        <Header/>
        <div className="flex flex-row items-center">
            <Sidebar/>
            {children}
            {path === "/dashboard" ? locations : null}
        </div>
    </div>
  );
}