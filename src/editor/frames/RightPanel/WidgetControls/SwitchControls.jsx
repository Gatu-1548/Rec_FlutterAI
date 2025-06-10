/* eslint-disable no-unused-vars */
import React from 'react'

export default function SwitchControls({ widget, updateWidget }) {
  const handleInputFocus = (e) => {
    e.target.select()
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Estado</label>
        <select
          className="block w-full border border-[#53EAFD]/30 rounded-md px-3 py-2 bg-[#1B273A] text-[#E2E8F0]
          focus:outline-none focus:ring-1 focus:ring-[#53EAFD] focus:border-[#53EAFD] transition-all"
          value={widget.checked ? 'true' : 'false'}
          onChange={(e) => updateWidget({ checked: e.target.value === 'true' })}
        >
          <option value="true">Activado</option>
          <option value="false">Desactivado</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E2E8F0]">Color activo</label>
        <input
          type="color"
          className="h-10 w-10 cursor-pointer border border-[#53EAFD]/30 bg-[#1B273A]"
          value={widget.color || '#3b82f6'}
          onChange={(e) => updateWidget({ color: e.target.value })}
        />
      </div>
    </>
  )
}
