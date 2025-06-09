// 📁 src/editor/export/generators/utils.js

export function capitalize(str) {
    if (typeof str !== 'string') return 'Pantalla';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }