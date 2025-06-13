import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateRoomModal({ isOpen, onClose, onCreate, roomInput, setRoomInput }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [joinLink, setJoinLink] = useState('')
  const [joinError, setJoinError] = useState(false)

  if (!isOpen) return null

  const fullURL = `${window.location.origin}/room/${roomInput}`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullURL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoin = () => {
    try {
      const url = new URL(joinLink)
      if (!url.pathname.startsWith('/room/')) throw new Error()
      navigate(url.pathname)
    } catch {
      setJoinError(true)
      setTimeout(() => setJoinError(false), 3000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-2xl border border-[#53EAFD]/20 w-[480px]">
        <h2 className="text-2xl font-bold text-[#53EAFD] mb-6 text-center">Sala de colaboración</h2>

        {/* Crear nueva sala */}
        <div className="mb-6">
          <label className="text-sm text-white/70 mb-1 block">Nombre para nueva sala:</label>
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="ej. diseño123"
            className="w-full bg-[#1e293b] border border-[#53eafd33] text-white placeholder-[#53EAFD]/50 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#53EAFD]"
          />

          {roomInput && (
            <div className="flex justify-between items-center text-sm bg-[#1e293b] border border-[#53EAFD]/20 rounded-lg px-3 py-2">
              <span className="truncate">{fullURL}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 bg-[#53EAFD] text-[#0f172a] rounded hover:bg-[#3bdaf0] text-xs font-medium"
              >
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4 mb-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onCreate}
            className="flex-1 px-4 py-2 bg-[#53EAFD] text-[#0f172a] rounded-lg hover:bg-[#3bdaf0] transition font-semibold"
            disabled={!roomInput.trim()}
          >
            Crear Sala
          </button>
        </div>

        {/* Unirse a una sala existente */}
        <div className="border-t border-white/10 pt-4">
          <label className="text-sm text-white/70 mb-1 block">¿Tienes un enlace? Únete a una sala:</label>
          <input
            type="text"
            value={joinLink}
            onChange={(e) => setJoinLink(e.target.value)}
            placeholder="Pega aquí el enlace..."
            className="w-full bg-[#1e293b] border border-[#53eafd33] text-white placeholder-white/40 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#53EAFD]"
          />

          {joinError && <p className="text-red-400 text-sm mb-2">❌ Enlace no válido</p>}

          <button
            onClick={handleJoin}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            disabled={!joinLink.trim()}
          >
            Unirme a la sala
          </button>
        </div>
      </div>
    </div>
  )
}
