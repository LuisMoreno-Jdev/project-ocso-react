'use client'

import { ReactNode, useState } from "react";
import { LuPen } from "react-icons/lu";
// Importamos Rocket por si quieres mantener el icono por defecto o usarlo dentro

interface Props {
  children: ReactNode; // Esto permite el uso de {children} como en la imagen
}

export default function UpdateLocation({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón que dispara el modal (onPress={onOpen} en la imagen) */}
      <button
        onClick={toggleModal}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
      >
        <LuPen size="20" />
      </button>

      {/* Estructura del Modal (Modal isOpen={isOpen} en la imagen) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity" 
            onClick={toggleModal} 
          />

          {/* Modal Content / ModalDialog */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header (Equivalente al ModalHeader de la imagen) */}
            <div className="p-6 pb-2 flex flex-col gap-1 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                Actualizar Ubicación
              </h3>
              <p className="text-sm text-gray-500">Modifica los datos de la tienda seleccionada</p>
            </div>

            {/* Modal Body (Aquí es donde inyectamos {children} como hizo el profe) */}
            <div className="p-6">
              {children}
            </div>

            {/* Modal Footer / Botón de cerrar */}
            <div className="p-4 bg-gray-50 flex justify-end">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
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