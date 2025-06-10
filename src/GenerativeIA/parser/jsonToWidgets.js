import { useWidgetStore } from "../../editor/store/useWidgetStore";
export function parseGeminiJsonToWidgets(geminiJson) {
  const screenId = 'pantalla1';
  const baseX = 20;
  const baseY = 30;
  const spacing = 60;

  const children = geminiJson.children || [];
  const parsedWidgets = children.map((item, index) => {
    const y = baseY + index * spacing;

    switch (item.type.toLowerCase()) {
      case 'text_input':
        return {
          id: crypto.randomUUID(),
          type: 'input',
          x: baseX,
          y,
          placeholder: item.label || 'Campo',
          width: 250,
        };

      case 'dropdown':
       return {
          id: crypto.randomUUID(),
          type: 'dropdown',  // ✅ Tipo real y separado
          x: baseX,
          y,
          label: item.label || 'Selecciona',
          items: item.options && item.options.length ? item.options : ['Opción 1', 'Opción 2'],
          width: 250
        };

      case 'button':
        return {
          id: crypto.randomUUID(),
          type: 'button',
          x: baseX,
          y,
          text: item.label || 'Enviar',
          width: 150,
        };

      default:
        return {
          id: crypto.randomUUID(),
          type: 'text',
          x: baseX,
          y,
          text: item.label || 'Componente',
        };
    }
  });

  // Cargar los widgets en el store para que exportToFlutterCode funcione
  useWidgetStore.getState().loadWidgets({
    [screenId]: parsedWidgets,
  });

  return parsedWidgets;
}