import { Component } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8 text-center">
      <Component className="text-[#53EAFD] mb-4 animate-pulse" size={48} />
      <p className="text-[#53EAFD]/80 text-sm md:text-base break-words max-w-[80%]">
        Selecciona un elemento para editar sus propiedades
      </p>
    </div>
  )
}
