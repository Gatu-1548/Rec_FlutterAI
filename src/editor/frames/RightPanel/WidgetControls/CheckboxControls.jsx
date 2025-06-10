export function CheckboxControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => e.target.select()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Texto</label>
        <input type="text" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.text || 'Opción'} onChange={(e) => updateWidget({ text: e.target.value })} onFocus={handleInputFocus} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color</label>
        <div className="flex items-center gap-2">
          <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget.color || '#3b82f6'} onChange={(e) => updateWidget({ color: e.target.value })} />
          <span className="text-sm text-[#E2E8F0]">{widget.color || '#3b82f6'}</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Tamaño</label>
        <input type="number" min="10" max="30" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.size || 16} onChange={(e) => updateWidget({ size: Number(e.target.value) })} onFocus={handleInputFocus} />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="checkedToggle" checked={widget.checked || false} onChange={(e) => updateWidget({ checked: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="checkedToggle" className="text-sm font-medium text-[#E2E8F0]">Marcado por defecto</label>
      </div>
    </>
  )
}
