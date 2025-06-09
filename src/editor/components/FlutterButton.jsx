/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterButton({ id }) {
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

  return (
    <>
      <button
        ref={ref}
        className="absolute bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          backgroundColor: widget.color || '#3b82f6',
          outline: isSelected ? '1px dashed #ccc' : 'none'
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        {widget.text || 'Botón'}
      </button>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable={true}
          rotatable={true}
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
          onRotateEnd={({ target, rotate }) => {
            updateWidget(id, { rotation: rotate })
          }}
        />
      )}
    </>
  )
}