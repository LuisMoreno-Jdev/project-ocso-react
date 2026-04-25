import { ReactNode } from "react";
import ManagerCards from "./_components/ManagerCard";

export default function LayoutManager({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full">
      {" "}
      {/* Aseguramos un flex para las dos columnas */}
      <div className="w-4/12 h-[90vh] overflow-y-auto overflow-x-hidden p-6">
        <ManagerCards />
      </div>
      <div className="flex-1 h-[90vh] overflow-y-auto">{children}</div>
    </div>
  );
}
