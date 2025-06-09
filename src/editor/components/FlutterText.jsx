/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterText({ id }) {
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
  }, [widget, selectedId]) // Actualizar target cuando cambia el widget o la selección

  if (!widget) return null

  const isSelected = selectedId === id

  return (
    <>
      <div
        ref={ref}
        className="absolute font-bold cursor-pointer"
        style={{
          fontSize: widget.fontSize || 16,
          color: widget.color || '#000000',
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          outline: isSelected ? '1px dashed #ccc' : 'none' // Opcional: mostrar borde cuando está seleccionado
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        {widget.text || 'Texto demo'}
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable={true}
          rotatable={true}
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