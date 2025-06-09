import React from 'react'
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
} from 'lucide-react'

export default function WidgetPanel() {
  const addWidget = useWidgetStore((state) => state.addWidget)

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
  }

  return (
    <div className="bg-[#0f172a] text-white border-r border-[#53eafd33]
                    lg:w-64 w-fit
                    flex flex-col items-center gap-3 p-4
                    overflow-y-auto scroll-smooth max-h-[calc(100vh-4rem)]">
      
      {/* Header visible solo en desktop */}
      <div className="lg:flex hidden items-center gap-2 text-[#53EAFD] mb-2 font-bold text-lg">
        <span className="bg-[#53EAFD]/10 p-2 rounded-lg"></span>
        Widget Library
      </div>

      {/* Lista de widgets */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
        {Object.entries(widgetIcons).map(([type, icon]) => (
          <button
            key={type}
            onClick={() => addWidget(type)}
            className="bg-[#1e293b] hover:bg-[#1f2d41] text-white border border-[#53eafd33]
                      rounded-xl 
                      p-2 lg:p-4
                      flex flex-col items-center justify-center gap-1 lg:gap-2 
                      shadow-md transition-all duration-200 
                      w-[54px] h-[54px] lg:w-[84px] lg:h-[84px]
                      hover:shadow-[#53EAFD]/30 mx-auto"
            title={type}
          >
            <div className="text-[#53EAFD]">{icon}</div>
            <span className="text-[10px] lg:text-[12px] text-white/90 font-medium text-center capitalize lg:block hidden">
              {type}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}