/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterSwitch({ id }) {
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

  const handleToggle = () => {
    updateWidget(id, { checked: !widget.checked })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute cursor-pointer flex items-center gap-2"
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={widget.checked ?? false}
            onChange={handleToggle}
            className="w-5 h-5 accent-blue-500"
          />
          <span className="text-sm text-gray-800">Switch</span>
        </label>
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
