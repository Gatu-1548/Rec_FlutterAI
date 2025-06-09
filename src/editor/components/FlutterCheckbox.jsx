import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterCheckbox({ id }) {
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
      <div
        ref={ref}
        className="absolute flex items-center gap-2 cursor-pointer"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          outline: isSelected ? '1px dashed #999' : 'none'
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        <input type="checkbox" checked={widget.checked || false} readOnly />
        <span>{widget.text || 'Opción'}</span>
      </div>

      {isSelected && target && (
        <Moveable
          target={target}
          draggable
          rotatable
          onDrag={({ left, top }) => {
            ref.current.style.left = `${left}px`
            ref.current.style.top = `${top}px`
          }}
          onDragEnd={({ left, top }) => updateWidget(id, { x: left, y: top })}
          onRotate={({ transform }) => {
            ref.current.style.transform = transform
          }}
          onRotateEnd={({ rotate }) => updateWidget(id, { rotation: rotate })}
        />
      )}
    </>
  )
}
