/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterContainer({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  )
  const updateWidget = useWidgetStore((state) => state.updateWidget)
  const selectedId = useWidgetStore((state) => state.selectedId)
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)

  const ref = useRef(null)
  const [target, setTarget] = useState(null)

  useEffect(() => {
    if (ref.current) setTarget(ref.current)
  }, [widget, selectedId])

  if (!widget) return null

  const isSelected = selectedId === id

  return (
    <>
      <div
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
        style={{
          position: 'absolute',
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          width: `${widget.width || 200}px`,
          height: `${widget.height || 150}px`,
          backgroundColor: widget.color || '#f3f4f6',
          border: isSelected ? '2px dashed #2563eb' : '1px solid #d1d5db',
          borderRadius: widget.borderRadius ? `${widget.borderRadius}px` : '0px',
          transform: `rotate(${widget.rotation || 0}deg)`,
          boxShadow: widget.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
          cursor: 'move',
          overflow: 'hidden',
        }}
      >
        {/* Contenido del contenedor (puede ser children en el futuro) */}
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable={true}
          rotatable={true}
          resizable={true}
          throttleDrag={1}
          throttleRotate={1}
          throttleResize={1}
          keepRatio={false}
          edge={false}
          onDrag={({ left, top }) => {
            ref.current.style.left = `${left}px`
            ref.current.style.top = `${top}px`
          }}
          onDragEnd={({ left, top }) => {
            updateWidget(id, { x: left, y: top })
          }}
          onRotate={({ transform }) => {
            ref.current.style.transform = transform
          }}
          onRotateEnd={({ rotate }) => {
            updateWidget(id, { rotation: rotate })
          }}
          onResize={({ width, height, drag }) => {
            ref.current.style.width = `${width}px`
            ref.current.style.height = `${height}px`
          }}
          onResizeEnd={({ width, height }) => {
            updateWidget(id, { width, height })
          }}
        />
      )}
    </>
  )
}