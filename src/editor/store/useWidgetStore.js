import { create } from 'zustand'
import { nanoid } from 'nanoid'

export const useWidgetStore = create((set) => ({
  currentScreen: 'pantalla1',
  selectedId: null,
  widgets: {
    pantalla1: [],
    pantalla2: [],
  },

  setCurrentScreen: (screenId) => set({ currentScreen: screenId }),
  setSelectedId: (id) => set({ selectedId: id }),

  addWidget: (type, screenId) =>
    set((state) => {
      const id = nanoid()
      const screen = screenId || state.currentScreen

      const typeDefaults = {
        text: {
          text: 'Texto demo',
          color: '#000000',
          fontSize: 16,
          width: 120,
          height: 40,
        },
        button: {
          text: 'Botón',
          color: '#3b82f6',
          textColor: '#ffffff',
          fontSize: 14,
          width: 100,
          height: 40,
          borderRadius: 6,
        },
        container: {
          color: '#f3f4f6',
          width: 200,
          height: 150,
          borderRadius: 8,
          shadow: true,
        },
        image: {
          src: 'https://via.placeholder.com/150',
          width: 100,
          height: 100,
        },
        input: {
          placeholder: 'Escribe aquí',
          color: '#ffffff',
          textColor: '#000000',
          fontSize: 14,
          width: 200,
          height: 40,
          paddingHorizontal: 10,
          paddingVertical: 8,
          border: true,
        },
        checkbox: {
          text: 'Opción',
          checked: false,
          color: '#3b82f6',
          fontSize: 14,
          textColor: '#000000',
        },
        list: {
          items: ['Item 1', 'Item 2', 'Item 3'],
          backgroundColor: '#ffffff',
          textColor: '#374151',
          fontSize: 14,
          width: 200,
          height: 'auto',
        },
        form: {
          width: 300,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
          fieldBackground: '#f9fafb',
          buttonColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          buttonText: 'Enviar',
        },
        appbar: {
          text: 'Mi Aplicación',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          textSize: '1.125rem',
          height: 56,
          showBackButton: false,
          showActions: true,
          elevation: true,
          width: '100%',
        },
        bottomnav: {
          width: 320,
          height: 72,
          backgroundColor: '#ffffff',
          activeColor: '#3b82f6',
          inactiveColor: '#6b7280',
          showLabels: true,
          elevation: true,
          padding: 16,
          floatingActionButton: false,
          fabColor: '#3b82f6',
          fabIconColor: '#ffffff',
          defaultActive: 0,
          customItems: null,
        },
      }

      const newWidget = {
        id,
        type,
        x: type === 'appbar' ? 0 : 20,
        y: type === 'appbar' ? 0 : type === 'bottomnav' ? 584 - 92 : 70,
        rotation: 0,
        ...typeDefaults[type],
      }

      return {
        widgets: {
          ...state.widgets,
          [screen]: [...(state.widgets[screen] || []), newWidget],
        },
        selectedId: id,
      }
    }),

  updateWidget: (id, changes) =>
    set((state) => {
      const screen = state.currentScreen
      const updatedList = state.widgets[screen].map((w) =>
        w.id === id ? { ...w, ...changes } : w
      )
      return {
        widgets: {
          ...state.widgets,
          [screen]: updatedList,
        },
      }
    }),

  updateSelectedWidget: (changes) =>
    set((state) => {
      if (!state.selectedId) return state
      const screen = state.currentScreen
      const updatedList = state.widgets[screen].map((w) =>
        w.id === state.selectedId ? { ...w, ...changes } : w
      )
      return {
        widgets: {
          ...state.widgets,
          [screen]: updatedList,
        },
      }
    }),

  removeWidget: (id) =>
    set((state) => {
      const screen = state.currentScreen
      const updatedList = state.widgets[screen].filter((w) => w.id !== id)
      return {
        widgets: {
          ...state.widgets,
          [screen]: updatedList,
        },
      }
    }),
}))
