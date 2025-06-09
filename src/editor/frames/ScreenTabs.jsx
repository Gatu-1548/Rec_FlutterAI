import React from 'react'

export default function ScreenTabs({ currentScreen, setCurrentScreen, screenList }) {
  return (
    <div className="flex gap-2 p-2 bg-white shadow-md justify-center">
      {screenList.map((screen) => (
        <button
          key={screen.id}
          onClick={() => setCurrentScreen(screen.id)}
          className={`px-4 py-1 rounded ${
            currentScreen === screen.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {screen.name}
        </button>
      ))}
    </div>
  )
}
