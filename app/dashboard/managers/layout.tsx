import { ReactNode } from "react";
import ManagerCards from "./_components/ManagerCard"; // Asegúrate que el nombre del archivo sea correcto (Cards vs Card)

export default function LayoutManager({ children, count }: { children: ReactNode, count: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-4/12 h-[90vh] overflow-y-auto overflow-x-hidden p-6 border-r">
        <ManagerCards />
      </div>
      
      <div className="w-8/12 p-6 flex flex-col justify-center items-center gap-10">
        <div>
          {children}
        </div>
        <div>
          {count}
        </div>
      </div>
    </div>
  );
}