// src/store/useCanvasStore.js
import { create } from 'zustand'

export const useCanvasStore = create((set) => ({
  canvasSize: { width: 360, height: 800 },
  setCanvasSize: (preset) => {
    const sizes = {
      small: { width: 320, height: 640 },
      medium: { width: 360, height: 800 },
      tablet: { width: 800, height: 1280 },
    }
    set({ canvasSize: sizes[preset] || sizes.medium })
  }
}))
