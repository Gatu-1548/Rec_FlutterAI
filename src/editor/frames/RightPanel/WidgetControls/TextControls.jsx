import React from 'react'

export default function TextControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Texto</label>
        <input
          type="text"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.text || ''}
          onChange={(e) => updateWidget({ text: e.target.value })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
            value={widget.color || '#000000'}
            onChange={(e) => updateWidget({ color: e.target.value })}
          />
          <span className="text-sm text-[#E2E8F0]">{widget.color || '#000000'}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Tamaño de fuente</label>
        <input
          type="number"
          min="8"
          max="72"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.fontSize || 16}
          onChange={(e) => updateWidget({ fontSize: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>
    </>
  )
}
