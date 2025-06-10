/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterPanel({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  )
  const selectedId = useWidgetStore((state) => state.selectedId)
  const updateWidget = useWidgetStore((state) => state.updateWidget)
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)

  const ref = useRef(null)
  const [target, setTarget] = useState(null)

  useEffect(() => {
    setTarget(ref.current)
  }, [widget, selectedId])

  if (!widget) return null

  const isSelected = selectedId === id
  const scrollable = widget.scrollable ?? true

  return (
    <>
      <div
        ref={ref}
        className="absolute overflow-hidden"
        style={{
          width: widget.width || 260,
          height: widget.height || 180,
          backgroundColor: widget.backgroundColor || '#f9fafb',
          border: widget.border ? '1px solid #cbd5e1' : 'none',
          borderRadius: `${widget.borderRadius || 8}px`,
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          overflowY: scrollable ? 'scroll' : 'hidden',
          padding: '8px',
          transform: `rotate(${widget.rotation || 0}deg)`,
          outline: isSelected ? '1px dashed #ccc' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        <div className="text-sm text-gray-700">Panel de contenido</div>
        <div className="text-xs text-gray-500 mt-2">
          Aquí podrías colocar otros widgets o texto de prueba...
        </div>
        <div style={{ height: scrollable ? 200 : 0 }}></div>
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable
                  rotatable
                  resizable
            onResize={({ width, height }) => {
            ref.current.style.width = `${width}px`
            ref.current.style.height = `${height}px`
            }}
            onResizeEnd={({ width, height }) => {
            updateWidget(id, { width, height })
            }}

          onDrag={({ left, top }) => {
            ref.current.style.left = `${left}px`
            ref.current.style.top = `${top}px`
          }}
          onDragEnd={({ target }) => {
            const newX = parseFloat(target.style.left)
            const newY = parseFloat(target.style.top)
            updateWidget(id, { x: newX, y: newY })
          }}
          onRotate={({ transform }) => {
            ref.current.style.transform = transform
          }}
          onRotateEnd={({ target, rotate }) => {
            updateWidget(id, { rotation: rotate })
          }}
        />
      )}
    </>
  )
}
