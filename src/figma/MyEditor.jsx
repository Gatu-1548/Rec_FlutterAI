/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from './socketService'
import WidgetPanel from '../editor/frames/WidgetPanel'
import ScreenTabs from '../editor/frames/ScreenTabs'
import CanvasPhone from '../editor/canvas/CanvasPhone'
import RightPanel from '../editor/frames/RightPanel/index'
import { exportToFlutterCode } from '../editor/export/flutterExporter'
import { useCanvasStore } from '../editor/store/useCanvasStore'
import { useWidgetStore } from '../editor/store/useWidgetStore'
import ProjectManagerModal from '../figma/ProjectModal'

export default function MyEditor() {
  const currentScreen = useWidgetStore((state) => state.currentScreen)
  const setWidgets = useWidgetStore((state) => state.setWidgets)
  const setCurrentRoom = useWidgetStore((state) => state.setCurrentRoom)
  const setCanvasSize = useCanvasStore((state) => state.setCanvasSize)
  const widgets = useWidgetStore((state) => state.widgets)

  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [projectMode, setProjectMode] = useState('save')

  const { roomName } = useParams()

  const screenList = [
    { id: 'pantalla1', name: 'Pantalla 1' },
    { id: 'pantalla2', name: 'Pantalla 2' },
    { id: 'pantalla3', name: 'Pantalla 3' },
    { id: 'pantalla4', name: 'Pantalla 4' },
    { id: 'pantalla5', name: 'Pantalla 5' },
  ]

  // Unirse a la sala cuando entra
  useEffect(() => {
    if (roomName) {
      setCurrentRoom(roomName)
      socket.emit('joinRoom', roomName)
      console.log(`🟢 Te has unido a la sala: ${roomName}`)
    }
  }, [roomName])

  // Recibir cambios de otros usuarios
  useEffect(() => {
    const handleReceive = ({ widgets: newWidgets }) => {
      console.log('🟡 Widgets recibidos desde socket:', newWidgets)
      if (newWidgets) setWidgets(newWidgets)
    }

    socket.on('receiveWidgets', handleReceive)
    return () => socket.off('receiveWidgets', handleReceive)
  }, [roomName])

  return (
    <div className="flex flex-col h-screen bg-[#1A263A] text-white">
      {/* 🔝 Top bar */}
      <div className="flex flex-wrap justify-between items-center px-4 py-3 bg-[#0f172a] border-b border-[#53eafd33] shadow-md">
        <div className="flex flex-wrap items-center gap-4">
          <ScreenTabs screenList={screenList} />
          <div className="relative">
            <select
              onChange={(e) => setCanvasSize(e.target.value)}
              defaultValue="small"
              className="appearance-none bg-[#1e293b] border border-[#53eafd33] rounded-lg px-4 py-2 pr-8 text-sm font-medium text-white hover:border-[#53EAFD] focus:outline-none focus:ring-2 focus:ring-[#53EAFD] focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="small">Chico (360x800)</option>
              <option value="medium">Mediano (410x915)</option>
              <option value="tablet">Tablet (800x1280)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportToFlutterCode}
            className="bg-[#53EAFD] hover:bg-[#3bdaf0] text-[#0f172a] px-4 py-2 rounded-lg transition-all duration-200 shadow font-semibold flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar Flutter
          </button>

          <button
            onClick={() => {
              setProjectMode('save')
              setProjectModalOpen(true)
            }}
            className="bg-[#34D399] hover:bg-[#2ecf83] text-[#0f172a] px-4 py-2 rounded-lg transition-all duration-200 shadow font-semibold flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
            Guardar
          </button>

          <button
            onClick={() => {
              setProjectMode('load')
              setProjectModalOpen(true)
            }}
            className="bg-[#FBBF24] hover:bg-[#facc15] text-[#0f172a] px-4 py-2 rounded-lg transition-all duration-200 shadow font-semibold flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Cargar
          </button>
        </div>
      </div>

      {/* 📐 Área principal */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 md:w-64 flex-shrink-0 bg-[#0F172A] overflow-y-auto border-r border-white/5">
          <WidgetPanel />
        </div>

        <div className="flex-1 overflow-auto min-w-0 bg-[#1A263A]">
          <CanvasPhone screenId={currentScreen} />
        </div>

        <RightPanel screenList={screenList} />
      </div>

      {/* Modal para guardar/cargar proyectos */}
      // En tu editor principal, reemplaza el ProjectModal con:
        <ProjectManagerModal
          isOpen={projectModalOpen}
          mode={projectMode}
          onClose={() => setProjectModalOpen(false)}
          onSave={(name) => {
            const all = JSON.parse(localStorage.getItem('projects') || '{}')
            all[name] = widgets
            localStorage.setItem('projects', JSON.stringify(all))
          }}
          onLoad={(name) => {
            const all = JSON.parse(localStorage.getItem('projects') || '{}')
            if (all[name]) {
              setWidgets(all[name])
              if (roomName) {
                socket.emit('widgetsChange', { roomName, widgets: all[name] })
              }
            }
          }}
        />
    </div>
  )
}