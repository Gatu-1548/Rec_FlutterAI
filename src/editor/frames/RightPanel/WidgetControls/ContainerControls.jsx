import React from 'react'

export function ContainerControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => e.target.select()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <div className="flex items-center gap-2">
          <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget.color || '#f3f4f6'} onChange={(e) => updateWidget({ color: e.target.value })} />
          <span className="text-sm text-[#E2E8F0]">{widget.color || '#f3f4f6'}</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Ancho</label>
        <input type="number" min="10" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.width || 200} onChange={(e) => updateWidget({ width: Number(e.target.value) })} onFocus={handleInputFocus} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Alto</label>
        <input type="number" min="10" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.height || 150} onChange={(e) => updateWidget({ height: Number(e.target.value) })} onFocus={handleInputFocus} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Radio de borde</label>
        <input type="number" min="0" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.borderRadius || 8} onChange={(e) => updateWidget({ borderRadius: Number(e.target.value) })} onFocus={handleInputFocus} />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="shadowToggle" checked={widget.shadow || false} onChange={(e) => updateWidget({ shadow: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="shadowToggle" className="text-sm font-medium text-[#E2E8F0]">Sombra</label>
      </div>
    </>
  )
}