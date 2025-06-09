/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { useWidgetStore } from '../store/useWidgetStore'
import { Trash2 } from 'lucide-react'

export default function RightPanel() {
  const selectedId = useWidgetStore((s) => s.selectedId)
  const currentScreen = useWidgetStore((s) => s.currentScreen)
  const widget = useWidgetStore((s) =>
    s.widgets[s.currentScreen].find((w) => w.id === selectedId)
  )
  const updateSelectedWidget = useWidgetStore((s) => s.updateSelectedWidget)
  const removeWidget = useWidgetStore((s) => s.removeWidget)
  const setSelectedId = useWidgetStore((s) => s.setSelectedId)

  const handleInputFocus = (e) => {
    e.target.select()
  }

  const handleDeleteWidget = () => {
    removeWidget(selectedId)
    setSelectedId(null)
  }

  if (!widget) {
    return (
      <div className="w-64 h-full bg-gray-50 p-4 border-l border-gray-200 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-center">
          Selecciona un elemento para editar sus propiedades
        </p>
      </div>
    )
  }

  return (
    <div className="w-64 h-full bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Propiedades del {widget.type}
        </h3>
        <button
          onClick={handleDeleteWidget}
          className="text-red-500 hover:text-red-700"
          title="Eliminar widget"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Propiedades comunes a todos los widgets */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Posición X</label>
          <input
            type="number"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={widget.x || 0}
            onChange={(e) => updateSelectedWidget({ x: Number(e.target.value) })}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Posición Y</label>
          <input
            type="number"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={widget.y || 0}
            onChange={(e) => updateSelectedWidget({ y: Number(e.target.value) })}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Rotación (grados)</label>
          <input
            type="number"
            min="0"
            max="360"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={widget.rotation || 0}
            onChange={(e) => updateSelectedWidget({ rotation: Number(e.target.value) })}
            onFocus={handleInputFocus}
          />
        </div>

        {/* Propiedades específicas por tipo de widget */}
        {widget.type === 'text' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Texto</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.text || ''}
                onChange={(e) => updateSelectedWidget({ text: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.color || '#000000'}
                  onChange={(e) => updateSelectedWidget({ color: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.color || '#000000'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Tamaño de fuente</label>
              <input
                type="number"
                min="8"
                max="72"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.fontSize || 16}
                onChange={(e) => updateSelectedWidget({ fontSize: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>
          </>
        )}

        {widget.type === 'button' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Texto</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.text || 'Botón'}
                onChange={(e) => updateSelectedWidget({ text: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.color || '#3b82f6'}
                  onChange={(e) => updateSelectedWidget({ color: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.color || '#3b82f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.textColor || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ textColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.textColor || '#ffffff'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Radio de borde</label>
              <input
                type="number"
                min="0"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.borderRadius || 6}
                onChange={(e) => updateSelectedWidget({ borderRadius: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>
          </>
        )}

        {widget.type === 'image' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">URL de la imagen</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.src || ''}
                onChange={(e) => updateSelectedWidget({ src: e.target.value })}
                onFocus={handleInputFocus}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Ancho</label>
              <input
                type="number"
                min="10"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.width || 100}
                onChange={(e) => updateSelectedWidget({ width: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Alto</label>
              <input
                type="number"
                min="10"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.height || 100}
                onChange={(e) => updateSelectedWidget({ height: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>
          </>
        )}

        {/* Continúa con los demás tipos de widgets... */}
        {widget.type === 'container' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.color || '#f3f4f6'}
                  onChange={(e) => updateSelectedWidget({ color: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.color || '#f3f4f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Ancho</label>
              <input
                type="number"
                min="10"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.width || 200}
                onChange={(e) => updateSelectedWidget({ width: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Alto</label>
              <input
                type="number"
                min="10"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.height || 150}
                onChange={(e) => updateSelectedWidget({ height: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Radio de borde</label>
              <input
                type="number"
                min="0"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.borderRadius || 8}
                onChange={(e) => updateSelectedWidget({ borderRadius: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shadowToggle"
                checked={widget.shadow || false}
                onChange={(e) => updateSelectedWidget({ shadow: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="shadowToggle" className="text-sm font-medium text-gray-700">
                Sombra
              </label>
            </div>
          </>
        )}

        {widget.type === 'input' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Placeholder</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.placeholder || ''}
                onChange={(e) => updateSelectedWidget({ placeholder: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.color || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ color: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.color || '#ffffff'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.textColor || '#000000'}
                  onChange={(e) => updateSelectedWidget({ textColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.textColor || '#000000'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Tamaño de fuente</label>
              <input
                type="number"
                min="8"
                max="72"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.fontSize || 14}
                onChange={(e) => updateSelectedWidget({ fontSize: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>
          </>
        )}

        {widget.type === 'checkbox' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Texto</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.text || 'Opción'}
                onChange={(e) => updateSelectedWidget({ text: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.color || '#3b82f6'}
                  onChange={(e) => updateSelectedWidget({ color: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.color || '#3b82f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Tamaño</label>
              <input
                type="number"
                min="10"
                max="30"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.size || 16}
                onChange={(e) => updateSelectedWidget({ size: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="checkedToggle"
                checked={widget.checked || false}
                onChange={(e) => updateSelectedWidget({ checked: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="checkedToggle" className="text-sm font-medium text-gray-700">
                Marcado por defecto
              </label>
            </div>
          </>
        )}

        {widget.type === 'list' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ backgroundColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.backgroundColor || '#ffffff'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.textColor || '#374151'}
                  onChange={(e) => updateSelectedWidget({ textColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.textColor || '#374151'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Tamaño de fuente</label>
              <input
                type="number"
                min="8"
                max="72"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.fontSize || 14}
                onChange={(e) => updateSelectedWidget({ fontSize: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Ancho</label>
              <input
                type="number"
                min="100"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.width || 200}
                onChange={(e) => updateSelectedWidget({ width: Number(e.target.value) })}
                onFocus={handleInputFocus}
              />
            </div>
          </>
        )}

        {widget.type === 'form' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ backgroundColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.backgroundColor || '#ffffff'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de borde</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.borderColor || '#e5e7eb'}
                  onChange={(e) => updateSelectedWidget({ borderColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.borderColor || '#e5e7eb'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Texto del botón</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.buttonText || 'Enviar'}
                onChange={(e) => updateSelectedWidget({ buttonText: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color del botón</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.buttonColor || '#3b82f6'}
                  onChange={(e) => updateSelectedWidget({ buttonColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.buttonColor || '#3b82f6'}</span>
              </div>
            </div>
          </>
        )}

        {widget.type === 'appbar' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Título</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={widget.text || 'Mi Aplicación'}
                onChange={(e) => updateSelectedWidget({ text: e.target.value })}
                onFocus={handleInputFocus}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.backgroundColor || '#3b82f6'}
                  onChange={(e) => updateSelectedWidget({ backgroundColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.backgroundColor || '#3b82f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.textColor || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ textColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.textColor || '#ffffff'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showBackButton"
                checked={widget.showBackButton || false}
                onChange={(e) => updateSelectedWidget({ showBackButton: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showBackButton" className="text-sm font-medium text-gray-700">
                Mostrar botón de retroceso
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showActions"
                checked={widget.showActions !== false}
                onChange={(e) => updateSelectedWidget({ showActions: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showActions" className="text-sm font-medium text-gray-700">
                Mostrar acciones
              </label>
            </div>
          </>
        )}

        {widget.type === 'bottomnav' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color de fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSelectedWidget({ backgroundColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.backgroundColor || '#ffffff'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color activo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.activeColor || '#3b82f6'}
                  onChange={(e) => updateSelectedWidget({ activeColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.activeColor || '#3b82f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800">Color inactivo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-10 cursor-pointer border border-gray-300"
                  value={widget.inactiveColor || '#6b7280'}
                  onChange={(e) => updateSelectedWidget({ inactiveColor: e.target.value })}
                />
                <span className="text-sm text-gray-800">{widget.inactiveColor || '#6b7280'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showLabels"
                checked={widget.showLabels !== false}
                onChange={(e) => updateSelectedWidget({ showLabels: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showLabels" className="text-sm font-medium text-gray-700">
                Mostrar etiquetas
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="floatingActionButton"
                checked={widget.floatingActionButton || false}
                onChange={(e) => updateSelectedWidget({ floatingActionButton: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="floatingActionButton" className="text-sm font-medium text-gray-700">
                Botón flotante
              </label>
            </div>

            {widget.floatingActionButton && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">Color FAB</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-10 w-10 cursor-pointer border border-gray-300"
                      value={widget.fabColor || '#3b82f6'}
                      onChange={(e) => updateSelectedWidget({ fabColor: e.target.value })}
                    />
                    <span className="text-sm text-gray-800">{widget.fabColor || '#3b82f6'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-800">Color icono FAB</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-10 w-10 cursor-pointer border border-gray-300"
                      value={widget.fabIconColor || '#ffffff'}
                      onChange={(e) => updateSelectedWidget({ fabIconColor: e.target.value })}
                    />
                    <span className="text-sm text-gray-800">{widget.fabIconColor || '#ffffff'}</span>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}