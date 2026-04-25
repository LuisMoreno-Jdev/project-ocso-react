"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  path: string;
}

const NavItem = ({ icon, path }: NavItemProps) => {
  const pathName = usePathname();
  
  const handleHardNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    // Forzamos navegación nativa para limpiar cache de LocationCard
    window.location.href = path;
  };

  return (
    <a 
      href={path} 
      onClick={handleHardNavigation} 
      className="w-full flex justify-center hover:scale-110 transition-transform"
    >
      <span className={
        pathName === path 
          ? 'bg-orange-400 w-10/12 flex justify-center rounded-md py-2 transition-colors' 
          : 'w-10/12 py-2 flex justify-center'
      }>
        {icon}
      </span>
    </a>
  );
}

export default NavItem;