/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterCalendar({ id }) {
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

  const isSelected = selectedId === id

  const today = new Date().toISOString().split('T')[0]

  const handleDateChange = (e) => {
    updateWidget(id, { selectedDate: e.target.value })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-white border border-gray-300 rounded p-2"
        style={{
          width: widget.width || 240,
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
        <label className="block text-sm text-gray-700 mb-1">
          Selecciona una fecha:
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 px-2 py-1 rounded"
          value={widget.selectedDate || today}
          onChange={handleDateChange}
        />
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
