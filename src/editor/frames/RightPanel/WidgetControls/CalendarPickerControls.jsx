import React from 'react'

export default function CalendarControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Ancho</label>
        <input
          type="number"
          min="100"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.width || 300}
          onChange={(e) => updateWidget({ width: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Alto</label>
        <input
          type="number"
          min="100"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.height || 300}
          onChange={(e) => updateWidget({ height: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.backgroundColor || '#ffffff'}
          onChange={(e) => updateWidget({ backgroundColor: e.target.value })}
        />
      </div>
    </>
  )
}
