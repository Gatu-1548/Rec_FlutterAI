export function AppbarControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => e.target.select()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium ">Título</label>
        <input type="text" className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all" value={widget.text || 'Mi Aplicación'} onChange={(e) => updateWidget({ text: e.target.value })} onFocus={handleInputFocus} />
      </div>

      {[['Color de fondo', 'backgroundColor', '#3b82f6'], ['Color de texto', 'textColor', '#ffffff']].map(([label, key, defaultColor]) => (
        <div className="space-y-2" key={key}>
          <label className="block text-sm font-medium ">{label}</label>
          <div className="flex items-center gap-2">
            <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget[key] || defaultColor} onChange={(e) => updateWidget({ [key]: e.target.value })} />
            <span className="text-sm text-[#E2E8F0]">{widget[key] || defaultColor}</span>
          </div>
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="showBackButton" checked={widget.showBackButton || false} onChange={(e) => updateWidget({ showBackButton: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="showBackButton" className="text-sm font-medium text-[#E2E8F0]">Mostrar botón de retroceso</label>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="showActions" checked={widget.showActions !== false} onChange={(e) => updateWidget({ showActions: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="showActions" className="text-sm font-medium text-[#E2E8F0]">Mostrar acciones</label>
      </div>
    </>
  )
}
