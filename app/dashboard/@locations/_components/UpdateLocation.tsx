"use client";

import { ReactNode, useState } from "react";
import { LuPen } from "react-icons/lu";

interface Props {
  children: ReactNode;
}

export default function UpdateLocation({
  children,
  store,
}: Props & { store: string | string[] | undefined }) {
  if (!store) return <div></div>;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center"
      >
        <LuPen size="28" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={toggleModal}
          />

          {/* Modal Content - Ajustado a max-w-lg para ser más grande */}
          <div className="relative bg-orange-400 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in duration-200 border border-orange-300">
            {/* Modal Body - Inyectamos children directamente sobre el fondo naranja */}
            <div className="p-2">{children}</div>

            {/* Modal Footer - Estilizado para fundirse con el naranja */}
            <div className="p-4 bg-orange-400 flex justify-end">
              <button
                onClick={toggleModal}
                className="px-6 py-2 text-sm font-bold text-white hover:bg-orange-500 rounded-lg transition-colors border border-white/20"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
