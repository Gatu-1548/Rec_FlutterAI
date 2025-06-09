import React, { useRef, useEffect, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterList({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  )
  const selectedId = useWidgetStore((state) => state.selectedId)
  const updateWidget = useWidgetStore((state) => state.updateWidget)
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)

  const ref = useRef(null)
  const [target, setTarget] = useState(null)
  const [items, setItems] = useState(widget?.items || ['Item 1', 'Item 2', 'Item 3'])

  useEffect(() => {
    if (ref.current) setTarget(ref.current)
  }, [widget, selectedId])

  useEffect(() => {
    if (widget?.items) {
      setItems(widget.items)
    }
  }, [widget?.items])

  if (!widget) return null

  const isSelected = selectedId === id

  const handleAddItem = () => {
    const newItems = [...items, `Item ${items.length + 1}`]
    setItems(newItems)
    updateWidget(id, { items: newItems })
  }

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    updateWidget(id, { items: newItems })
  }

  const handleItemChange = (index, value) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
    updateWidget(id, { items: newItems })
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-white shadow-sm rounded-md overflow-hidden"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          border: isSelected ? '2px dashed #2563eb' : '1px solid #e5e7eb',
          minWidth: '150px',
          minHeight: '100px',
          width: widget.width || 'auto',
          height: widget.height || 'auto',
          backgroundColor: widget.backgroundColor || '#ffffff',
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedId(id)
        }}
      >
        <ul
          className="list-disc pl-6 py-2"
          style={{
            color: widget.textColor || '#374151',
            fontSize: widget.fontSize || '14px',
            fontFamily: widget.fontFamily || 'inherit',
          }}
        >
          {items.map((item, index) => (
            <li key={index} className="py-1 px-2 hover:bg-gray-50 flex items-center justify-between">
              {isSelected ? (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none flex-1"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span>{item}</span>
              )}
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveItem(index)
                  }}
                  className="text-red-500 ml-2"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>

        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAddItem()
            }}
            className="w-full py-1 text-sm text-blue-500 hover:bg-gray-50 border-t border-gray-100"
          >
            + Añadir item
          </button>
        )}
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
          onDragEnd={({ target }) => {
            const newX = parseFloat(target.style.left)
            const newY = parseFloat(target.style.top)
            updateWidget(id, { x: newX, y: newY })
          }}           onRotateEnd={({ rotate }) => updateWidget(id, { rotation: rotate })}
          onResizeEnd={({ width, height }) => updateWidget(id, { width, height })}
        />
      )}
    </>
  )
}
