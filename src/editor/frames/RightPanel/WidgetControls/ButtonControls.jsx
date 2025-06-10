export function ButtonControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => e.target.select()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Texto</label>
        <input type="text" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.text || 'Botón'} onChange={(e) => updateWidget({ text: e.target.value })} onFocus={handleInputFocus} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <div className="flex items-center gap-2">
          <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget.color || '#3b82f6'} onChange={(e) => updateWidget({ color: e.target.value })} />
          <span className="text-sm text-[#E2E8F0]">{widget.color || '#3b82f6'}</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de texto</label>
        <div className="flex items-center gap-2">
          <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget.textColor || '#ffffff'} onChange={(e) => updateWidget({ textColor: e.target.value })} />
          <span className="text-sm text-[#E2E8F0]">{widget.textColor || '#ffffff'}</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Radio de borde</label>
        <input type="number" min="0" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.borderRadius || 6} onChange={(e) => updateWidget({ borderRadius: Number(e.target.value) })} onFocus={handleInputFocus} />
      </div>
    </>
  )
}