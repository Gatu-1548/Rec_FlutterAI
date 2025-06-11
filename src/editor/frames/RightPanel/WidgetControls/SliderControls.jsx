import React from 'react'

export default function SliderControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Valor actual</label>
        <input
          type="number"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.value || 0}
          onChange={(e) => updateWidget({ value: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Valor mínimo</label>
        <input
          type="number"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.min || 0}
          onChange={(e) => updateWidget({ min: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Valor máximo</label>
        <input
          type="number"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.max || 100}
          onChange={(e) => updateWidget({ max: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color activo</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.activeColor || '#53EAFD'}
          onChange={(e) => updateWidget({ activeColor: e.target.value })}
        />
      </div>
    </>
  )
}
