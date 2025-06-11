import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterDrawer({ id }) {
  const widget = useWidgetStore((s) => s.widgets[s.currentScreen].find((w) => w.id === id))
  const selectedId = useWidgetStore((s) => s.selectedId)
  const updateWidget = useWidgetStore((s) => s.updateWidget)
  const setSelectedId = useWidgetStore((s) => s.setSelectedId)
  const ref = useRef(null)
  const [target, setTarget] = useState(null)

  useEffect(() => {
    if (ref.current) setTarget(ref.current)
  }, [widget, selectedId])

  if (!widget) return null

  const isSelected = selectedId === id
  const items = widget.items || ['Home', 'Profile', 'Settings']

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-[#1B273A] text-white p-4 rounded-md shadow"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          width: widget.width || 200,
          height: widget.height || 300,
          transform: `rotate(${widget.rotation || 0}deg)`,
          border: isSelected ? '2px dashed #2563eb' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        <div className="text-sm font-bold mb-2">Drawer (Vista previa)</div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-[#53EAFD]">{item}</li>
          ))}
        </ul>
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable
          resizable
          rotatable
          onDragEnd={({ target }) => {
            updateWidget(id, {
              x: parseFloat(target.style.left),
              y: parseFloat(target.style.top),
            })
          }}
          onResizeEnd={({ width, height }) => {
            updateWidget(id, { width, height })
          }}
          onRotateEnd={({ rotate }) => {
            updateWidget(id, { rotation: rotate })
          }}
        />
      )}
    </>
  )
}
