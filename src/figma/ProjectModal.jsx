import React, { useState } from 'react'

export default function ProjectModal({ isOpen, mode, onClose, onSave, onLoad }) {
  const [inputName, setInputName] = useState('')
  const savedProjects = JSON.parse(localStorage.getItem('projects') || '{}')
  const savedNames = Object.keys(savedProjects)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!inputName.trim()) return
    if (mode === 'save') {
      onSave(inputName.trim())
    } else {
      onLoad(inputName.trim())
    }
    setInputName('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-2xl border border-[#53EAFD]/20 w-[400px]">
        <h2 className="text-xl font-bold text-[#53EAFD] mb-4 text-center">
          {mode === 'save' ? 'Guardar proyecto' : 'Cargar proyecto'}
        </h2>

        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder={
            mode === 'save' ? 'Nombre nuevo (ej. pantalla-login)' : 'Nombre existente (ej. pantalla-login)'
          }
          className="w-full bg-[#1e293b] border border-[#53eafd33] text-white placeholder-[#53EAFD]/50 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#53EAFD]"
        />

        {mode === 'load' && savedNames.length > 0 && (
          <div className="text-sm text-white/70 mb-4">
            <p className="mb-1">Proyectos guardados:</p>
            <ul className="list-disc list-inside text-cyan-400">
              {savedNames.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#53EAFD] text-[#0f172a] rounded-lg hover:bg-[#3bdaf0] transition font-semibold"
          >
            {mode === 'save' ? 'Guardar' : 'Cargar'}
          </button>
        </div>
      </div>
    </div>
  )
}
