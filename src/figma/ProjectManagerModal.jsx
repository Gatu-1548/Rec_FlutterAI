// src/figma/ProjectManagerModal.jsx
import React, { useState, useEffect } from 'react'
import { socket } from '../socketService'
import { useParams } from 'react-router-dom'
import { useWidgetStore } from '../editor/store/useWidgetStore'

export default function ProjectManagerModal({ isOpen, mode = 'save', onClose, onSave, onLoad }) {
  const [projectName, setProjectName] = useState('')
  const [savedProjects, setSavedProjects] = useState({})
  const { roomName } = useParams()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('projects') || '{}')
    setSavedProjects(stored)
  }, [isOpen]) // Actualizar lista cada vez que se abre el modal

  const handleSave = () => {
    if (!projectName.trim()) {
      alert('Por favor ingresa un nombre para el proyecto')
      return
    }
    
    if (onSave) {
      onSave(projectName)
    } else {
      const widgets = useWidgetStore.getState().widgets
      const updated = { ...savedProjects, [projectName]: widgets }
      localStorage.setItem('projects', JSON.stringify(updated))
      setSavedProjects(updated)
    }
    
    setProjectName('')
    if (mode === 'save') onClose()
  }

  const handleLoad = (name) => {
    const loaded = savedProjects[name]
    if (!loaded) return
    
    if (onLoad) {
      onLoad(name)
    } else {
      useWidgetStore.getState().setWidgets(loaded)
      if (roomName) {
        socket.emit('widgetsChange', { roomName, widgets: loaded })
      }
    }
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] text-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-[#53EAFD]/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#53EAFD]">
            {mode === 'save' ? 'Guardar proyecto' : 'Cargar proyecto'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {mode === 'save' && (
          <div className="mb-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Nombre del proyecto"
              className="w-full bg-[#1e293b] border border-[#53EAFD]/30 text-white px-4 py-2 rounded-lg placeholder-[#53EAFD]/40 focus:outline-none focus:ring-2 focus:ring-[#53EAFD]"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        )}

        <div className="flex flex-col space-y-3">
          {mode === 'save' ? (
            <>
              <button
                onClick={handleSave}
                disabled={!projectName.trim()}
                className="flex items-center justify-center gap-2 bg-[#34D399] hover:bg-[#2ecf83] text-[#0f172a] px-4 py-2 rounded-lg transition font-semibold disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                Guardar proyecto
              </button>
            </>
          ) : (
            <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
              {Object.keys(savedProjects).length > 0 ? (
                Object.keys(savedProjects).map((name) => (
                  <button
                    key={name}
                    onClick={() => handleLoad(name)}
                    className="w-full flex justify-between items-center bg-[#1e293b] hover:bg-[#53EAFD]/10 px-4 py-3 rounded-lg border border-[#53EAFD]/10 transition group"
                  >
                    <span>{name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#53EAFD] opacity-0 group-hover:opacity-100 transition" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-white/50">
                  No hay proyectos guardados
                </div>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition mt-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}