import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'
import { useWidgetStore } from '../store/useWidgetStore'

export default function FlutterImage({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  )
  const updateWidget = useWidgetStore((state) => state.updateWidget)
  const selectedId = useWidgetStore((state) => state.selectedId)
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)

  const ref = useRef(null)
  const [target, setTarget] = useState(null)
  const [localImage, setLocalImage] = useState(null)

  useEffect(() => {
    if (ref.current) setTarget(ref.current)
  }, [widget, selectedId])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLocalImage(event.target.result)
        updateWidget(id, { src: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  if (!widget) return null

  const isSelected = selectedId === id
  const imageSrc = localImage || widget.src || 'https://via.placeholder.com/100'

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
          width: `${widget.width || 100}px`,
          height: `${widget.height || 100}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          border: isSelected ? '2px dashed #2563eb' : 'none',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageSrc}
          alt="imagen"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
        
        {isSelected && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
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
          onRotateEnd={({ rotate }) => {
            updateWidget(id, { rotation: rotate })
          }}
          onResize={({ width, height }) => {
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