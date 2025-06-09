import React from 'react'

export default function ScreenTabs({ currentScreen, setCurrentScreen, screenList }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 bg-[#0f172a] border-b border-[#53eafd33] shadow-md justify-center lg:justify-start">
      {screenList.map((screen) => (
        <button
          key={screen.id}
          onClick={() => setCurrentScreen(screen.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${
              currentScreen === screen.id
                ? 'bg-[#53EAFD] text-[#0f172a] shadow-lg'
                : 'bg-[#1e293b] text-white hover:bg-[#253649] hover:text-[#53EAFD]'
            }`}
        >
          {screen.name}
        </button>
      ))}
    </div>
  )
}
