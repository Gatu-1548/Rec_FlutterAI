// src/store/useCanvasStore.js
import { create } from 'zustand'

export const useCanvasStore = create((set) => ({
  canvasSize: { width: 360, height: 800 },
  setCanvasSize: (preset) => {
    const sizes = {
      small: { width: 360, height: 800 },
      medium: { width: 410, height: 915 },
      tablet: { width: 800, height: 1280 },
    }
    set({ canvasSize: sizes[preset] || sizes.medium })
  }
}))
