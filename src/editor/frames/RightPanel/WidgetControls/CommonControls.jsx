import React from 'react'

export default function CommonControls({ widget, updateWidget, screenList = [] }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Posición X</label>
        <input
          type="number"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.x || 0}
          onChange={(e) => updateWidget({ x: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Posición Y</label>
        <input
          type="number"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.y || 0}
          onChange={(e) => updateWidget({ y: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Rotación (grados)</label>
        <input
          type="number"
          min="0"
          max="360"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] 
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.rotation || 0}
          onChange={(e) => updateWidget({ rotation: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      {/* Navegación condicional solo si el widget puede navegar */}
      {['button', 'list', 'form'].includes(widget.type) && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#E2E8F0]">Navegar a:</label>
          <select
            className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
            focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
            value={widget.navigateTo || ''}
            onChange={(e) => updateWidget({ navigateTo: e.target.value })}
          >
            <option value="">Ninguna</option>
            {screenList.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}
