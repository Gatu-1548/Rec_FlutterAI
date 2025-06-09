import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';
import { useWidgetStore } from '../store/useWidgetStore';

export default function FlutterAppBar({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  );
  const selectedId = useWidgetStore((state) => state.selectedId);
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  const setSelectedId = useWidgetStore((state) => state.setSelectedId);

  const ref = useRef(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (ref.current) setTarget(ref.current);
  }, [widget, selectedId]);

  if (!widget) return null;

  const isSelected = selectedId === id;

  return (
    <>
      <div
        ref={ref}
        className="absolute flex items-center justify-between"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          width: `${widget.width || '100%'}`,
          height: `${widget.height || 56}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          backgroundColor: widget.backgroundColor || '#3b82f6',
          color: widget.textColor || '#ffffff',
          boxShadow: widget.elevation ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
          border: isSelected ? '2px dashed #2563eb' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
      >
        <div className="flex items-center pl-4">
          {widget.showBackButton && (
            <button 
              className="mr-2"
              style={{ color: widget.iconColor || widget.textColor || '#ffffff' }}
            >
              ←
            </button>
          )}
          <span 
            className="text-lg font-medium"
            style={{ fontSize: widget.textSize || '1.125rem' }}
          >
            {widget.text || 'Mi Aplicación'}
          </span>
        </div>
        
        {widget.showActions && (
          <div className="flex items-center pr-4 space-x-3">
            <button style={{ color: widget.iconColor || widget.textColor || '#ffffff' }}>
              🔍
            </button>
            <button style={{ color: widget.iconColor || widget.textColor || '#ffffff' }}>
              ⋮
            </button>
          </div>
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
            ref.current.style.left = `${left}px`;
            ref.current.style.top = `${top}px`;
          }}
          onDragEnd={({ left, top }) => {
            updateWidget(id, { x: left, y: top });
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