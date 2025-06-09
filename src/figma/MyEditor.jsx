import React, { useState } from 'react'
import WidgetPanel from '../editor/frames/WidgetPanel'
import ScreenTabs from '../editor/frames/ScreenTabs'
import CanvasPhone from '../editor/canvas/CanvasPhone'
import RightPanel from '../editor/frames/RightPanel'
import { exportToFlutterCode } from '../editor/export/flutterExporter' // ✅ Correcto

export default function MyEditor() {
  const [currentScreen, setCurrentScreen] = useState('pantalla1')

  const screenList = [
    { id: 'pantalla1', name: 'Pantalla 1' },
    { id: 'pantalla2', name: 'Pantalla 2' },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top bar con tabs y botón de exportación */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow">
        <ScreenTabs {...{ currentScreen, setCurrentScreen, screenList }} />
        <button
          onClick={exportToFlutterCode}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Exportar código Flutter
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-1 overflow-hidden">
        <WidgetPanel />
        <CanvasPhone screenId={currentScreen} />
        <RightPanel />
      </div>
    </div>
  )
}
