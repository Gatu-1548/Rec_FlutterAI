/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterTabs({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  )
  const selectedId = useWidgetStore((state) => state.selectedId)
  const updateWidget = useWidgetStore((state) => state.updateWidget)
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)

  const ref = useRef(null)
  const [target, setTarget] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(widget.selectedIndex || 0)

  useEffect(() => {
    setTarget(ref.current)
  }, [widget, selectedId])

  if (!widget) return null

  const isSelected = selectedId === id
  const tabs = widget.tabs || ['Tab 1', 'Tab 2', 'Tab 3']

  const handleTabClick = (index) => {
    setSelectedIndex(index)
    updateWidget(id, { selectedIndex: index })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-white border border-gray-300 rounded shadow"
        style={{
          width: widget.width || 260,
          height: widget.height || 150,
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
        <div className="flex border-b border-gray-300 bg-gray-100">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`flex-1 text-sm px-2 py-1 ${
                selectedIndex === idx
                  ? 'bg-white font-bold border-b-2 border-blue-500'
                  : 'text-gray-600'
              }`}
              onClick={() => handleTabClick(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-2 text-sm">
          Contenido de <strong>{tabs[selectedIndex]}</strong>
        </div>
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
