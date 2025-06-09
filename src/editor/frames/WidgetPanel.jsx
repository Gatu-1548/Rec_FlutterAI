import React from 'react'
import { useWidgetStore } from '../store/useWidgetStore'

export default function WidgetPanel() {
  const addWidget = useWidgetStore((state) => state.addWidget)

  return (
    <div className="w-60 bg-white shadow-md p-4 flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Widgets</h3>
      <button
        onClick={() => addWidget('text')}
        className="bg-blue-500 text-white rounded px-3 py-2"
      >
        Texto
      </button>
      <button
        onClick={() => addWidget('button')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Botón
        </button>
        
        <button
        onClick={() => addWidget('image')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Imagen
        </button>
        
          <button
        onClick={() => addWidget('container')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Contenedor
          </button> 
          <button
        onClick={() => addWidget('input')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Input
          </button>
          <button
        onClick={() => addWidget('checkbox')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Checkbox
          </button>

          <button
        onClick={() => addWidget('list')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        List
          </button>  
          <button
        onClick={() => addWidget('form')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >
        Form
          </button>  
          <button
        onClick={() => addWidget('appbar')}
        className="bg-green-500 text-white rounded px-3 py-2"
      >      
         AppBar          
          </button>
          <button   
        onClick={() => addWidget('bottomnav')}
        className="bg-green-500 text-white rounded px-3 py-2"
      > BottomNav          
          </button>

      </div>
      
  )
}
