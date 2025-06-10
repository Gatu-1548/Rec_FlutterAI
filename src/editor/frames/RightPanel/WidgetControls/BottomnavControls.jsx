export function BottomnavControls({ widget, updateWidget }) {
  return (
    <>
      {[['Color de fondo', 'backgroundColor', '#ffffff'], ['Color activo', 'activeColor', '#3b82f6'], ['Color inactivo', 'inactiveColor', '#6b7280']].map(([label, key, defaultColor]) => (
        <div className="space-y-2" key={key}>
          <label className="block text-sm font-medium text-[#fffff]">{label}</label>
          <div className="flex items-center gap-2">
            <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget[key] || defaultColor} onChange={(e) => updateWidget({ [key]: e.target.value })} />
            <span className="text-sm text-[#E2E8F0]">{widget[key] || defaultColor}</span>
          </div>
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="showLabels" checked={widget.showLabels !== false} onChange={(e) => updateWidget({ showLabels: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="showLabels" className="text-sm font-medium text-[#E2E8F0]">Mostrar etiquetas</label>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="floatingActionButton" checked={widget.floatingActionButton || false} onChange={(e) => updateWidget({ floatingActionButton: e.target.checked })} className="h-4 w-4 text-[#53EAFD] focus:ring-[#53EAFD] border-gray-600 rounded bg-[#1B273A]" />
        <label htmlFor="floatingActionButton" className="text-sm font-medium text-[#E2E8F0]">Botón flotante</label>
      </div>

      {widget.floatingActionButton && (
        <>
          {[['Color FAB', 'fabColor', '#3b82f6'], ['Color icono FAB', 'fabIconColor', '#ffffff']].map(([label, key, defaultColor]) => (
            <div className="space-y-2" key={key}>
              <label className="block text-sm font-medium text-[#E2E8F0]">{label}</label>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]" value={widget[key] || defaultColor} onChange={(e) => updateWidget({ [key]: e.target.value })} />
                <span className="text-sm text-[#E2E8F0]">{widget[key] || defaultColor}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}