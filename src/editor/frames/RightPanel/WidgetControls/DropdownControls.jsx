import React from 'react'

export default function DropdownControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  const handleChangeOption = (index, value) => {
    const updatedOptions = [...(widget.options || [])]
    updatedOptions[index] = value
    updateWidget({ options: updatedOptions })
  }

  const handleAddOption = () => {
    const updatedOptions = [...(widget.options || []), 'Nueva opción']
    updateWidget({ options: updatedOptions })
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = [...(widget.options || [])]
    updatedOptions.splice(index, 1)
    updateWidget({ options: updatedOptions })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Etiqueta</label>
        <input
          type="text"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.label || ''}
          onChange={(e) => updateWidget({ label: e.target.value })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Opciones</label>
        <div className="space-y-1">
          {(widget.options || []).map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleChangeOption(index, e.target.value)}
                onFocus={handleInputFocus}
                className="flex-1 border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
                focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="px-2 text-sm text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={handleAddOption}
            className="mt-1 text-sm text-[#53EAFD] hover:underline"
          >
            + Agregar opción
          </button>
        </div>
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color de texto</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.textColor || '#000000'}
          onChange={(e) => updateWidget({ textColor: e.target.value })}
        />
      </div>
    </>
  )
}
