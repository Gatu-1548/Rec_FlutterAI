/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';
import { useWidgetStore } from '../store/useWidgetStore';

export default function FlutterForm({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  );
  const selectedId = useWidgetStore((state) => state.selectedId);
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  const setSelectedId = useWidgetStore((state) => state.setSelectedId);

  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [formFields, setFormFields] = useState([
    { id: 1, type: 'text', placeholder: 'Nombre', required: true },
    { id: 2, type: 'email', placeholder: 'Correo', required: true },
    { id: 3, type: 'textarea', placeholder: 'Mensaje', required: false }
  ]);

  useEffect(() => {
    if (ref.current) setTarget(ref.current);
  }, [widget, selectedId]);

  if (!widget) return null;

  const isSelected = selectedId === id;

  const handleAddField = () => {
    const newId = formFields.length > 0 ? Math.max(...formFields.map(f => f.id)) + 1 : 1;
    setFormFields([
      ...formFields,
      { id: newId, type: 'text', placeholder: 'Nuevo campo', required: false }
    ]);
  };

  const handleRemoveField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-white p-4 rounded-lg shadow-md"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          border: isSelected ? '2px dashed #2563eb' : '1px solid #e5e7eb',
          width: widget.width || '300px',
          minHeight: '200px',
          backgroundColor: widget.backgroundColor || '#ffffff',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
      >
        <form className="space-y-3">
          {formFields.map((field) => (
            <div key={field.id} className="relative group">
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border rounded text-sm"
                  style={{
                    borderColor: widget.borderColor || '#d1d5db',
                    backgroundColor: widget.fieldBackground || '#f9fafb'
                  }}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border rounded text-sm"
                  style={{
                    borderColor: widget.borderColor || '#d1d5db',
                    backgroundColor: widget.fieldBackground || '#f9fafb'
                  }}
                  required={field.required}
                />
              )}
              
              {isSelected && (
                <div className="absolute right-0 top-0 flex space-x-1 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveField(field.id);
                    }}
                    className="text-red-500 text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}

          {isSelected && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddField();
              }}
              className="text-blue-500 text-sm flex items-center"
            >
              + Añadir campo
            </button>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
            style={{
              backgroundColor: widget.buttonColor || '#3b82f6',
              color: widget.buttonTextColor || '#ffffff'
            }}
          >
            {widget.buttonText || 'Enviar'}
          </button>
        </form>
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
            if (ref.current) {
              ref.current.style.left = `${left}px`;
              ref.current.style.top = `${top}px`;
            }
          }}
          onDragEnd={({ left, top }) => {
            updateWidget(id, { x: left, y: top });
          }}
          onRotate={({ transform }) => {
            if (ref.current) {
              ref.current.style.transform = transform;
            }
          }}
          onRotateEnd={({ rotate }) => {
            updateWidget(id, { rotation: rotate });
          }}
          onResize={({ width, height }) => {
            if (ref.current) {
              ref.current.style.width = `${width}px`;
              ref.current.style.height = `${height}px`;
            }
          }}
          onResizeEnd={({ width, height }) => {
            updateWidget(id, { width, height });
          }}
        />
      )}
    </>
  );
}