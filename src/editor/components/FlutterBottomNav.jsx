import React, { useRef, useEffect, useState } from 'react';
import Moveable from 'react-moveable';
import { useWidgetStore } from '../store/useWidgetStore';
import { Home, BarChart, Bell, Settings, Plus, User } from 'lucide-react';

export default function FlutterBottomNav({ id }) {
  const widget = useWidgetStore((state) =>
    state.widgets[state.currentScreen].find((w) => w.id === id)
  );
  const selectedId = useWidgetStore((state) => state.selectedId);
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  const setSelectedId = useWidgetStore((state) => state.setSelectedId);

  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [activeTab, setActiveTab] = useState(widget?.defaultActive || 0);

  useEffect(() => {
    if (ref.current) setTarget(ref.current);
  }, [widget, selectedId]);

  if (!widget) return null;

  const isSelected = selectedId === id;

  // Configuración de los items del menú
  const navItems = widget.customItems || [
    { icon: <Home size={20} />, label: "Inicio" },
    { icon: <BarChart size={20} />, label: "Stats" },
    { icon: <Bell size={20} />, label: "Alertas" },
    { icon: <Settings size={20} />, label: "Ajustes" }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
    // Aquí podrías añadir lógica adicional cuando se cambia de tab
  };

  return (
    <>
      <div
        ref={ref}
        className="absolute flex justify-around items-center rounded-t-2xl"
        style={{
          left: `${widget.x}px`,
          top: `${widget.y}px`,
          width: `${widget.width || 320}px`,
          height: `${widget.height || 72}px`,
          transform: `rotate(${widget.rotation || 0}deg)`,
          backgroundColor: widget.backgroundColor || '#ffffff',
          border: isSelected ? '2px dashed #2563eb' : 'none',
          boxShadow: widget.elevation ? '0 -2px 10px rgba(0,0,0,0.1)' : 'none',
          padding: widget.padding ? `${widget.padding}px` : '0 16px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
      >
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
            activeColor={widget.activeColor || '#3b82f6'}
            inactiveColor={widget.inactiveColor || '#6b7280'}
            showLabels={widget.showLabels !== false}
          />
        ))}
        
        {widget.floatingActionButton && (
          <div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            style={{
              backgroundColor: widget.fabColor || '#3b82f6',
              color: widget.fabIconColor || '#ffffff',
            }}
          >
            <div className="rounded-full p-3 shadow-lg">
              <Plus size={24} />
            </div>
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
            ref.current.style.left = `${left}px`
            ref.current.style.top = `${top}px`
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

function NavItem({ icon, label, active, onClick, activeColor, inactiveColor, showLabels }) {
  return (
    <div 
      className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${showLabels ? 'py-2' : 'py-3'}`}
      onClick={onClick}
      style={{
        color: active ? activeColor : inactiveColor,
        flex: 1,
        minWidth: '60px'
      }}
    >
      <div className={active ? 'scale-110 transition-transform' : ''}>
        {React.cloneElement(icon, { size: showLabels ? 20 : 24 })}
      </div>
      {showLabels && (
        <span 
          className="text-xs mt-1 font-medium"
          style={{
            color: active ? activeColor : inactiveColor
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}