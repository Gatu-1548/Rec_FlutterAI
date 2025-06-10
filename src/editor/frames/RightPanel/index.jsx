/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useWidgetStore } from '../../store/useWidgetStore'
import WidgetHeader from './WidgetHeader'
import EmptyState from './EmptyState'
import CommonControls from './WidgetControls/CommonControls'
import TextControls from './WidgetControls/TextControls'
import { ButtonControls } from './WidgetControls/ButtonControls'
import ImageControls from './WidgetControls/ImageControls'
import { ContainerControls } from './WidgetControls/ContainerControls'
import  InputControls from './WidgetControls/InputControls'
import { CheckboxControls } from './WidgetControls/CheckboxControls'
import ListControls from './WidgetControls/ListControls'
import FormControls from './WidgetControls/FormControls'
import { AppbarControls } from './WidgetControls/AppbarControls'
import { BottomnavControls} from './WidgetControls/BottomnavControls'
import { PanelRightClose, PanelRightOpen, ChevronLeft } from 'lucide-react'

export default function RightPanel() {
  const selectedId = useWidgetStore((s) => s.selectedId)
  const currentScreen = useWidgetStore((s) => s.currentScreen)
  const widget = useWidgetStore((s) =>
    s.widgets[s.currentScreen]?.find((w) => w.id === selectedId)
  )
  const updateSelectedWidget = useWidgetStore((s) => s.updateSelectedWidget)
  const removeWidget = useWidgetStore((s) => s.removeWidget)
  const setSelectedId = useWidgetStore((s) => s.setSelectedId)

  const [isMobile, setIsMobile] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setPanelOpen(!mobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDeleteWidget = () => {
    removeWidget(selectedId)
    setSelectedId(null)
    if (isMobile) setPanelOpen(false)
  }

  const togglePanel = () => {
    setPanelOpen(!panelOpen)
  }

  const FloatingButton = isMobile && !panelOpen && (
    <button
      onClick={togglePanel}
      className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#1B273A] text-[#53EAFD] p-3 rounded-l-lg border-2 border-[#53EAFD] hover:bg-[#53EAFD]/10 transition-all z-40 shadow-lg"
      style={{ width: '48px', height: '48px' }}
    >
      <PanelRightOpen size={24} className="animate-pulse" />
    </button>
  )

  const PanelContainer = (
    <div
      className={`
        h-full overflow-y-auto z-30
        transition-all duration-300 ease-in-out
        bg-gradient-to-b from-[#1B273A] to-[#0F172A] shadow-xl
        ${isMobile ? 'w-64 fixed right-0 top-0 h-screen' : 'w-64 relative'}
        ${!panelOpen && isMobile ? 'translate-x-full w-0 overflow-hidden' : ''}
      `}
    >
      {/* Enhanced close button for mobile */}
      {isMobile && panelOpen && (
        <button
          onClick={togglePanel}
          className="fixed right-64 top-20 bg-[#1B273A] text-[#53EAFD] p-3 rounded-l-lg border-2 border-[#53EAFD] hover:bg-[#53EAFD]/10 transition-all z-50 shadow-lg hover:scale-110 transform"
          style={{ width: '48px', height: '48px' }}
          title="Close panel"
        >
          <PanelRightClose size={24} />
        </button>
      )}

      <div className="p-4">
        <WidgetHeader widgetType={widget?.type} onDelete={handleDeleteWidget} />
        <div className="space-y-4 mt-6">
          <CommonControls widget={widget} updateWidget={updateSelectedWidget} />
          {widget?.type === 'text' && <TextControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'button' && <ButtonControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'image' && <ImageControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'container' && <ContainerControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'input' && <InputControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'checkbox' && <CheckboxControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'list' && <ListControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'form' && <FormControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'appbar' && <AppbarControls widget={widget} updateWidget={updateSelectedWidget} />}
          {widget?.type === 'bottomnav' && <BottomnavControls widget={widget} updateWidget={updateSelectedWidget} />}
        </div>
      </div>
    </div>
  )

  if (!widget) {
    return (
      <>
        {FloatingButton}
        <div className={`
          h-full bg-gradient-to-b from-[#1B273A] to-[#0F172A] shadow-xl z-30 transition-all duration-300 ease-in-out
          ${isMobile ? (panelOpen ? 'w-64 fixed right-0 top-0 h-screen' : 'w-0 overflow-hidden') : 'w-64 relative'}
        `}>
          {isMobile && panelOpen && (
            <button
              onClick={togglePanel}
              className="fixed right-64 top-20 bg-[#1B273A] text-[#53EAFD] p-3 rounded-l-lg border-2 border-[#53EAFD] hover:bg-[#53EAFD]/10 transition-all z-50 shadow-lg"
              style={{ width: '48px', height: '48px' }}
              title="Close panel"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {panelOpen && <EmptyState />}
        </div>
      </>
    )
  }

  return (
    <>
      {FloatingButton}
      {PanelContainer}
    </>
  )
}