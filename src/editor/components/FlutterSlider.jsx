/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterSlider({ id }) {
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

  const handleChange = (e) => {
    updateWidget(id, { value: Number(e.target.value) })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute w-[200px] cursor-pointer"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          outline: isSelected ? '1px dashed #ccc' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        <input
          type="range"
          min={widget.min ?? 0}
          max={widget.max ?? 100}
          value={widget.value ?? 50}
          onChange={handleChange}
          className="w-full"
        />
        <div className="text-xs text-gray-600 mt-1">Valor: {widget.value ?? 50}</div>
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
