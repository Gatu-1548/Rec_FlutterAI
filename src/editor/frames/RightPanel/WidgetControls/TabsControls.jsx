import React from 'react'

export default function TabsControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  const handleTabChange = (index, value) => {
    const newTabs = [...(widget.tabs || [])]
    newTabs[index] = value
    updateWidget({ tabs: newTabs })
  }

  const addTab = () => {
    const newTabs = [...(widget.tabs || []), `Pestaña ${widget.tabs?.length + 1 || 1}`]
    updateWidget({ tabs: newTabs })
  }

  const removeTab = (index) => {
    const newTabs = [...(widget.tabs || [])]
    newTabs.splice(index, 1)
    updateWidget({ tabs: newTabs })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de fondo</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.backgroundColor || '#ffffff'}
          onChange={(e) => updateWidget({ backgroundColor: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color activo</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.activeColor || '#3b82f6'}
          onChange={(e) => updateWidget({ activeColor: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Tamaño de fuente</label>
        <input
          type="number"
          min="10"
          max="32"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.fontSize || 14}
          onChange={(e) => updateWidget({ fontSize: Number(e.target.value) })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Pestañas</label>
        {(widget.tabs || []).map((tab, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-[#53EAFD]/30 rounded-md px-3 py-1 bg-[#1B273A] text-[#E2E8F0]"
              value={tab}
              onChange={(e) => handleTabChange(index, e.target.value)}
              onFocus={handleInputFocus}
            />
            <button
              type="button"
              onClick={() => removeTab(index)}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTab}
          className="mt-2 px-3 py-1 bg-[#53EAFD] text-black rounded hover:bg-[#3bdff7]"
        >
          + Añadir pestaña
        </button>
      </div>
    </>
  )
}
