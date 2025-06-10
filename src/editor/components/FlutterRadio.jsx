/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterRadio({ id }) {
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
  const options = widget.options || ['Opción A', 'Opción B', 'Opción C']
  const selected = widget.selected ?? options[0]

  const handleChange = (e) => {
    updateWidget(id, { selected: e.target.value })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute p-2 cursor-pointer"
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
        {options.map((option, idx) => (
          <label key={idx} className="block text-sm text-gray-800">
            <input
              type="radio"
              name={`radio-${id}`}
              value={option}
              checked={selected === option}
              onChange={handleChange}
              className="mr-2"
            />
            {option}
          </label>
        ))}
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
