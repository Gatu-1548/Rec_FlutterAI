import React from 'react'
import { useWidgetStore } from '../store/useWidgetStore'
import FlutterText from '../components/FlutterText'
import FlutterButton from '../components/FlutterButton'
import FlutterImage from '../components/FlutterImage'
import FlutterContainer from '../components/FlutterContainer'
import FlutterInput from '../components/FlutterInput'
import FlutterCheckbox from '../components/FlutterCheckbox'
import FlutterList from '../components/FlutterList'
import FlutterForm from '../components/FlutterForm'
import FlutterAppBar from '../components/FlutterAppBar'
import FlutterBottomNav from '../components/FlutterBottomNav'
import { useCanvasStore } from '../store/useCanvasStore'

export default function CanvasPhone({ screenId }) {
  const widgets = useWidgetStore((state) => state.widgets[screenId] || [])
  const setSelectedId = useWidgetStore((state) => state.setSelectedId)
  const { width, height } = useCanvasStore((state) => state.canvasSize)

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedId(null)
    }
  }

  return (
    <div className="flex justify-center items-start flex-1 bg-[#1A263A] overflow-auto relative">
      <div className="absolute top-[60px] left-[10%] w-[600px] h-[600px] blur-[160px] rounded-full bg-[#53EAFD] opacity-40 z-0 pointer-events-none" />
      <div
        className="relative z-10 rounded-[2.5rem] bg-black p-[8px] shadow-[0_0_30px_#53EAFD66]"
        style={{
          transform: 'scale(0.65)',
          transformOrigin: 'top left',
          marginTop: '40px',
        }}
      >
        <div
          className="relative bg-white rounded-[2rem] overflow-hidden"
          style={{ width, height }}
          onClick={handleCanvasClick}
        >
          {widgets.map((widget) => {
            if (widget.type === 'text') return <FlutterText key={widget.id} id={widget.id} />
            if (widget.type === 'button') return <FlutterButton key={widget.id} id={widget.id} />
            if (widget.type === 'image') return <FlutterImage key={widget.id} id={widget.id} />
            if (widget.type === 'container') return <FlutterContainer key={widget.id} id={widget.id} />
            if (widget.type === 'input') return <FlutterInput key={widget.id} id={widget.id} />
            if (widget.type === 'checkbox') return <FlutterCheckbox key={widget.id} id={widget.id} />
            if (widget.type === 'list') return <FlutterList key={widget.id} id={widget.id} />
            if (widget.type === 'form') return <FlutterForm key={widget.id} id={widget.id} />
            if (widget.type === 'appbar') return <FlutterAppBar key={widget.id} id={widget.id} />
            if (widget.type === 'bottomnav') return <FlutterBottomNav key={widget.id} id={widget.id} />
            return null
          })}
        </div>
      </div>
    </div>
  )
}
