import React from 'react'

export default function FormControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
            value={widget.backgroundColor || '#ffffff'}
            onChange={(e) => updateWidget({ backgroundColor: e.target.value })}
          />
          <span className="text-sm text-[#E2E8F0]">{widget.backgroundColor || '#ffffff'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de borde</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
            value={widget.borderColor || '#e5e7eb'}
            onChange={(e) => updateWidget({ borderColor: e.target.value })}
          />
          <span className="text-sm text-[#E2E8F0]">{widget.borderColor || '#e5e7eb'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Texto del botón</label>
        <input
          type="text"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.buttonText || 'Enviar'}
          onChange={(e) => updateWidget({ buttonText: e.target.value })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color del botón</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
            value={widget.buttonColor || '#3b82f6'}
            onChange={(e) => updateWidget({ buttonColor: e.target.value })}
          />
          <span className="text-sm text-[#E2E8F0]">{widget.buttonColor || '#3b82f6'}</span>
        </div>
      </div>
    </>
  )
}
