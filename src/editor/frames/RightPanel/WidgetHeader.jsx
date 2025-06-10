import React from 'react'
import { Trash2, Settings } from 'lucide-react'

export default function WidgetHeader({ widgetType, onDelete }) {
  return (
    <div className="flex justify-between items-center mb-4 p-3 bg-[#1B273A]/80 rounded-lg border border-[#53EAFD]/20">
      <div className="flex items-center gap-2">
        <Settings className="text-[#53EAFD]" size={18} />
        <h3 className="text-lg font-bold text-[#53EAFD]">
          {widgetType}
        </h3>
      </div>
      <button
        onClick={onDelete}
        className="text-[#FF6B6B] hover:text-[#FF3B3B] transition-colors"
        title="Eliminar widget"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}