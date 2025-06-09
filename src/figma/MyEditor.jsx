import React, { useState } from 'react'
import WidgetPanel from '../editor/frames/WidgetPanel'
import ScreenTabs from '../editor/frames/ScreenTabs'
import CanvasPhone from '../editor/canvas/CanvasPhone'
import RightPanel from '../editor/frames/RightPanel'
import { exportToFlutterCode } from '../editor/export/flutterExporter'
import { useCanvasStore } from '../editor/store/useCanvasStore'

export default function MyEditor() {
  const [currentScreen, setCurrentScreen] = useState('pantalla1')
  const setCanvasSize = useCanvasStore((state) => state.setCanvasSize)

  const screenList = [
    { id: 'pantalla1', name: 'Pantalla 1' },
    { id: 'pantalla2', name: 'Pantalla 2' },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top bar con tabs y controles */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow">
        <div className="flex items-center gap-4">
          <ScreenTabs {...{ currentScreen, setCurrentScreen, screenList }} />
          
          {/* Selector de tamaño mejorado */}
          <div className="relative">
            <select
              onChange={(e) => setCanvasSize(e.target.value)}
              defaultValue="medium"
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="small"> Chico (320x640)</option>
              <option value="medium"> Mediano (360x800)</option>
              <option value="tablet"> Tablet (800x1280)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={exportToFlutterCode}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm font-medium"
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