import React, { useState, useEffect } from 'react'
import { useWidgetStore } from '../store/useWidgetStore'
import {
  TextCursorInput,
  SquareArrowOutUpRight,
  Image,
  LayoutPanelTop,
  Keyboard,
  CheckSquare,
  ListTodo,
  FileText,
  Smartphone,
  PanelBottom,
  ToggleRight,
  SlidersHorizontal,
  ListStart,
  CircleDot,
  CreditCard,
  PanelTopClose,
  FolderGit2,
  LayoutDashboard,
  ChevronRight,
  PackagePlus
} from 'lucide-react'

export default function WidgetPanel() {
  const addWidget = useWidgetStore((state) => state.addWidget)
  const currentScreen = useWidgetStore((state) => state.currentScreen)
  const [isMobile, setIsMobile] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setPanelOpen(!mobile) // oculto en móvil por defecto
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const togglePanel = () => {
    setPanelOpen(!panelOpen)
  }

  const widgetIcons = {
    text: <TextCursorInput size={26} />,
    button: <SquareArrowOutUpRight size={26} />,
    image: <Image size={26} />,
    container: <LayoutPanelTop size={26} />,
    input: <Keyboard size={26} />,
    checkbox: <CheckSquare size={26} />,
    list: <ListTodo size={26} />,
    form: <FileText size={26} />,
    appbar: <Smartphone size={26} />,
    bottomnav: <PanelBottom size={26} />,
    switch: <ToggleRight size={26} />,
    slider: <SlidersHorizontal size={26} />,
    dropdown: <ListStart size={26} />,
    radio: <CircleDot size={26} />,
    card: <CreditCard size={26} />,
    panel: <PanelTopClose size={26} />,
    //tabs: <FolderGit2 size={26} />,
    //calendar: <CircleDot size={26} />,
    //drawer: <LayoutDashboard size={26} />,
  }

  return (
    <>
      {/* Botón flotante para abrir el panel (desktop y móvil) */}
      {!panelOpen && (
        <button
          onClick={togglePanel}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-[#1B273A] text-[#53EAFD] p-3 rounded-r-lg border-2 border-[#53EAFD] hover:bg-[#53EAFD]/10 transition-all z-40 shadow-lg"
          style={{ width: '48px', height: '48px' }}
          title="Abrir panel de widgets"
        >
          <PackagePlus size={24} className="animate-pulse" />
        </button>
      )}

      {/* Panel lateral */}
      {panelOpen && (
        <div
          className={`
            h-full overflow-y-auto z-30
            transition-all duration-300 ease-in-out
            bg-[#0f172a] border-r border-[#53eafd33]
            ${isMobile ? 'w-64 fixed left-0 top-0 h-screen' : 'w-64'}
          `}
        >
          <div className="p-4">
            {/* Header con botón de cerrar */}
            <div className="flex items-center justify-between text-[#53EAFD] mb-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <span className="bg-[#53EAFD]/10 p-2 rounded-lg"></span>
                Widget Library
              </div>
              <button
                onClick={togglePanel}
                className="text-[#53EAFD] hover:text-white bg-[#1B273A] border border-[#53EAFD]/50 rounded-md p-1 transition-all hover:bg-[#53EAFD]/10"
                title="Cerrar panel"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Grid de widgets */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {Object.entries(widgetIcons).map(([type, icon]) => (
                <button
                  key={type}
                  onClick={() => {
                    addWidget(type, currentScreen)
                    if (isMobile) setPanelOpen(false)
                  }}
                  className="
                    bg-[#1e293b] hover:bg-[#1f2d41] text-white border border-[#53eafd33]
                    rounded-xl p-3
                    flex flex-col items-center justify-center gap-2
                    shadow-md transition-all duration-200
                    hover:shadow-[#53EAFD]/30
                  "
                  title={type}
                >
                  <div className="text-[#53EAFD]">{icon}</div>
                  <span className="text-xs text-white/90 font-medium text-center capitalize">
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
