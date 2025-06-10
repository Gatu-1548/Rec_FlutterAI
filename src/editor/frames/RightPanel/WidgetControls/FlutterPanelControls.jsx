import React from 'react'

export default function PanelControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <input
          type="color"
          value={widget.backgroundColor || '#f3f4f6'}
          onChange={(e) => updateWidget({ backgroundColor: e.target.value })}
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Ancho</label>
        <input
          type="number"
          min="50"
          value={widget.width || 300}
          onChange={(e) => updateWidget({ width: Number(e.target.value) })}
          onFocus={handleInputFocus}
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Alto</label>
        <input
          type="number"
          min="50"
          value={widget.height || 200}
          onChange={(e) => updateWidget({ height: Number(e.target.value) })}
          onFocus={handleInputFocus}
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Borde</label>
        <input
          type="checkbox"
          checked={widget.showBorder ?? true}
          onChange={(e) => updateWidget({ showBorder: e.target.checked })}
          className="form-checkbox h-5 w-5 text-[#53EAFD] bg-[#1B273A] border-[#53EAFD]/30"
        />
        <span className="text-sm text-[#E2E8F0] ml-2">Mostrar borde</span>
      </div>
    </>
  )
}
