/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';
import { useWidgetStore } from '../store/useWidgetStore';

export default function FlutterInput({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  );
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  const selectedId = useWidgetStore((state) => state.selectedId);
  const setSelectedId = useWidgetStore((state) => state.setSelectedId);

  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (ref.current) setTarget(ref.current);
  }, [widget, selectedId]);

  if (!widget) return null;

  const isSelected = selectedId === id;

  // Función para generar código Flutter
  const generateFlutterCode = () => {
    return `TextField(
  ${widget.placeholder ? `decoration: InputDecoration(
    hintText: '${widget.placeholder}',
  ),` : ''}
  style: TextStyle(
    fontSize: ${widget.fontSize || 14},
    color: ${widget.textColor ? `Color(0xFF${widget.textColor.slice(1)})` : 'Colors.black'},
  ),
  decoration: InputDecoration(
    filled: true,
    fillColor: ${widget.color ? `Color(0xFF${widget.color.slice(1)})` : 'Colors.white'},
    border: OutlineInputBorder(),
    contentPadding: EdgeInsets.symmetric(
      horizontal: ${widget.paddingHorizontal || 10},
      vertical: ${widget.paddingVertical || 8},
    ),
  ),
)`;
  };

  return (
    <>
      <input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={widget.placeholder || 'Escribe aquí'}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
        style={{
          position: 'absolute',
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          width: `${widget.width || 200}px`,
          height: `${widget.height || 40}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          backgroundColor: widget.color || '#ffffff',
          border: isSelected ? '2px dashed #2563eb' : '1px solid #ccc',
          padding: `${widget.paddingVertical || 8}px ${widget.paddingHorizontal || 10}px`,
          borderRadius: '6px',
          fontSize: `${widget.fontSize || 14}px`,
          color: widget.textColor || '#000000',
          outline: 'none',
        }}
      />

      {isSelected && target && (
        <Moveable
          target={target}
          draggable={true}
          rotatable={true}
          resizable={true}
          throttleDrag={1}
          onDrag={({ left, top }) => {
            ref.current.style.left = `${left}px`;
            ref.current.style.top = `${top}px`;
          }}
          onDragEnd={({ target }) => {
            const newX = parseFloat(target.style.left)
            const newY = parseFloat(target.style.top)
            updateWidget(id, { x: newX, y: newY })
          }}  
          onRotate={({ transform }) => {
            ref.current.style.transform = transform;
          }}
          onRotateEnd={({ rotate }) => {
            updateWidget(id, { rotation: rotate });
          }}
          onResize={({ width, height }) => {
            ref.current.style.width = `${width}px`;
            ref.current.style.height = `${height}px`;
          }}
          onResizeEnd={({ width, height }) => {
            updateWidget(id, { width, height });
          }}
        />
      )}
    </>
  );
}