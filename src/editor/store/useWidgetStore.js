import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { socket } from '../../figma/socketService'

export const useWidgetStore = create((set, get) => ({
  currentScreen: 'pantalla1',
  currentRoom: null,
  selectedId: null,
  widgets: {
    pantalla1: [],
    pantalla2: [],
    pantalla3: [],
    pantalla4: [],
    pantalla5: [],
  },

  setCurrentScreen: (screenId) => set({ currentScreen: screenId }),
  setSelectedId: (id) => set({ selectedId: id }),
  setCurrentRoom: (roomName) => set({ currentRoom: roomName }),

  addWidget: (type, screenId) => {
    const state = get()
    const id = nanoid()
    const screen = screenId || state.currentScreen

    const typeDefaults = {
      text: { text: 'Texto demo', color: '#000000', fontSize: 16, width: 120, height: 40, navigateTo: '' },
      button: { text: 'Botón', color: '#3b82f6', textColor: '#ffffff', fontSize: 14, width: 100, height: 40, borderRadius: 6, navigateTo: '' },
      container: { color: '#f3f4f6', width: 200, height: 150, borderRadius: 8, shadow: true, navigateTo: '' },
      image: { src: 'https://via.placeholder.com/150', width: 100, height: 100, navigateTo: '' },
      input: { placeholder: 'Escribe aquí', color: '#ffffff', textColor: '#000000', fontSize: 14, width: 200, height: 40, paddingHorizontal: 10, paddingVertical: 8, border: true, navigateTo: '' },
      checkbox: { text: 'Opción', checked: false, color: '#3b82f6', fontSize: 14, textColor: '#000000', navigateTo: '' },
      list: { items: ['Item 1', 'Item 2', 'Item 3'], backgroundColor: '#ffffff', textColor: '#374151', fontSize: 14, width: 200, height: 'auto', navigateTo: '' },
      form: { width: 300, backgroundColor: '#ffffff', borderColor: '#e5e7eb', fieldBackground: '#f9fafb', buttonColor: '#3b82f6', buttonTextColor: '#ffffff', buttonText: 'Enviar', navigateTo: '' },
      appbar: { text: 'Mi Aplicación', backgroundColor: '#3b82f6', textColor: '#ffffff', iconColor: '#ffffff', textSize: '1.125rem', height: 56, showBackButton: false, showActions: true, elevation: true, width: '100%', navigateTo: '' },
      bottomnav: { width: 320, height: 72, backgroundColor: '#ffffff', activeColor: '#3b82f6', inactiveColor: '#6b7280', showLabels: true, elevation: true, padding: 16, floatingActionButton: false, fabColor: '#3b82f6', fabIconColor: '#ffffff', defaultActive: 0, customItems: null, navigateTo: '' },
      switch: { checked: false, color: '#3b82f6', navigateTo: '' },
      slider: { value: 50, min: 0, max: 100, navigateTo: '' },
      dropdown: { items: ['Opción 1', 'Opción 2', 'Opción 3'], value: 'Opción 1', navigateTo: '' },
      radio: { options: ['Opción A', 'Opción B', 'Opción C'], selected: 'Opción A', navigateTo: '' },
      card: { width: 200, height: 120, color: '#ffffff', borderRadius: 8, elevation: true, navigateTo: '' },
      tabs: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], selectedIndex: 0, width: 260, height: 150, navigateTo: '' },
      calendar: { selectedDate: '', width: 240, navigateTo: '' },
      panel: { width: 260, height: 180, backgroundColor: '#f9fafb', border: true, borderRadius: 8, scrollable: true, navigateTo: '' },
      drawer: { width: 200, height: 300, items: ['Home', 'Profile', 'Settings', 'Logout'], navigateTo: '' },
    }

    const newWidget = {
      id,
      type,
      x: type === 'appbar' ? 0 : 20,
      y: type === 'appbar' ? 0 : type === 'bottomnav' ? 584 - 92 : 70,
      rotation: 0,
      ...typeDefaults[type],
    }

    const newWidgets = structuredClone(state.widgets)
    if (!newWidgets[screen]) newWidgets[screen] = []
    newWidgets[screen].push(newWidget)

    if (state.currentRoom) {
      socket.emit('widgetsChange', { roomName: state.currentRoom, widgets: newWidgets })
    }

    set({ widgets: newWidgets, selectedId: id })
  },

  updateWidget: (id, changes) => {
    const state = get()
    const screen = state.currentScreen
    const updatedList = state.widgets[screen].map((w) =>
      w.id === id ? { ...w, ...changes } : w
    )
    const newWidgets = { ...state.widgets, [screen]: updatedList }

    if (state.currentRoom) {
      socket.emit('widgetsChange', { roomName: state.currentRoom, widgets: newWidgets })
    }

    set({ widgets: newWidgets })
  },

  updateSelectedWidget: (changes) => {
    const state = get()
    if (!state.selectedId) return
    const screen = state.currentScreen
    const updatedList = state.widgets[screen].map((w) =>
      w.id === state.selectedId ? { ...w, ...changes } : w
    )
    const newWidgets = { ...state.widgets, [screen]: updatedList }

    if (state.currentRoom) {
      socket.emit('widgetsChange', { roomName: state.currentRoom, widgets: newWidgets })
    }

    set({ widgets: newWidgets })
  },

  removeWidget: (id) => {
    const state = get()
    const screen = state.currentScreen
    const updatedList = state.widgets[screen].filter((w) => w.id !== id)
    const newWidgets = { ...state.widgets, [screen]: updatedList }

    if (state.currentRoom) {
      socket.emit('widgetsChange', { roomName: state.currentRoom, widgets: newWidgets })
    }

    set({ widgets: newWidgets })
  },

  loadWidgets: (newWidgetsByScreen) =>
    set((state) => ({
      widgets: { ...state.widgets, ...newWidgetsByScreen },
    })),

  setWidgets: (newWidgets) => {
    const state = get()

    const oldSerialized = JSON.stringify(state.widgets)
    const newSerialized = JSON.stringify(newWidgets)

    if (oldSerialized === newSerialized) return 

    if (state.currentRoom) {
      socket.emit('widgetsChange', { roomName: state.currentRoom, widgets: newWidgets })
    }

    set({ widgets: newWidgets })
  }
}))
