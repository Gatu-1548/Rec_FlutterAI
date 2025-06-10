import React from 'react'

export default function RadioControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...(widget.options || [])]
    newOptions[index] = value
    updateWidget({ options: newOptions })
  }

  const addOption = () => {
    updateWidget({ options: [...(widget.options || []), 'Opción nueva'] })
  }

  const removeOption = (index) => {
    const newOptions = [...(widget.options || [])]
    newOptions.splice(index, 1)
    updateWidget({ options: newOptions })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Opción seleccionada</label>
        <input
          type="text"
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.selected || ''}
          onChange={(e) => updateWidget({ selected: e.target.value })}
          onFocus={handleInputFocus}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Opciones</label>
        {(widget.options || []).map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 border border-[#53EAFD]/30 rounded-md px-3 py-1 bg-[#1B273A] text-[#E2E8F0]
              focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD]"
            />
            <button
              onClick={() => removeOption(index)}
              className="text-sm text-red-400 hover:text-red-600"
              title="Eliminar opción"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="text-sm text-[#53EAFD] hover:underline mt-1"
        >
          + Añadir opción
        </button>
      </div>
    </>
  )
}
