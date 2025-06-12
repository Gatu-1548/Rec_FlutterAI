import { generateWidgetDart } from './generateWidgetDart.js'

export function generateScreenFile(screenId, widgets) {
  const className = capitalize(screenId)

  // Recolectar todas las pantallas a las que se navega desde esta
  const uniqueDestinations = new Set(
    widgets
      .map(w => w.navigateTo)
      .filter(dest => dest && dest.trim() !== '' && dest !== screenId)
  )

  //  Agregar imports solo para pantallas distintas a la actual
  const importLines = Array.from(uniqueDestinations)
    .map(dest => `import '${dest}.dart';`)
    .join('\n')

  // AppBar y BottomNav si existen
  const appBarWidget = widgets.find(w => w.type === 'appbar')
  const bottomNavWidget = widgets.find(w => w.type === 'bottomnav')

  // Resto de widgets en Stack
  const hasAppBar = !!appBarWidget
  const offsetY = hasAppBar ? 72 : 0

  const positionedWidgets = widgets
    .filter(w => w.type !== 'appbar' && w.type !== 'bottomnav')
    .map(w => {
      const adjusted = { ...w, y: (w.y ?? 0) - offsetY }
      return generateWidgetDart(adjusted)
    })
    .join(',\n          ')

  return `
import 'package:flutter/material.dart';
${importLines}

class ${className} extends StatelessWidget {
  const ${className}({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ${appBarWidget ? `appBar: ${generateAppBar(appBarWidget)},` : ''}
      body: SafeArea(
        top: ${appBarWidget ? 'false' : 'true'},
        child: Stack(
            children: [
            ${positionedWidgets}
            ],
        ),
        ),
      ${bottomNavWidget ? `bottomNavigationBar: ${generateBottomNav(bottomNavWidget)},` : ''}
    );
  }
}
`
}

// AppBar generator
function generateAppBar(widget) {
  const bg = toColor(widget.backgroundColor || '#3b82f6')
  const fg = toColor(widget.textColor || '#ffffff')
  return `AppBar(
        title: Text('${widget.text || 'App'}'),
        backgroundColor: ${bg},
        foregroundColor: ${fg},
        elevation: ${widget.elevation ? 4 : 0},
        automaticallyImplyLeading: ${widget.showBackButton ? 'true' : 'false'},
        actions: ${widget.showActions ? '[IconButton(icon: Icon(Icons.search), onPressed: () {}), IconButton(icon: Icon(Icons.more_vert), onPressed: () {})]' : '[]'}
      )`
}

// BottomNavigationBar generator
function generateBottomNav(widget) {
  const active = toColor(widget.activeColor || '#3b82f6')
  const inactive = toColor(widget.inactiveColor || '#6b7280')
  const bg = toColor(widget.backgroundColor || '#ffffff')
  return `BottomNavigationBar(
        currentIndex: ${widget.defaultActive ?? 0},
        selectedItemColor: ${active},
        unselectedItemColor: ${inactive},
        backgroundColor: ${bg},
        showUnselectedLabels: ${widget.showLabels !== false},
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Inicio'),
          BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Stats'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alertas'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Ajustes'),
        ],
        onTap: (index) {
          // Todo: agregar navegación si deseas
        },
      )`
}

// function toColor(hex) {
//   return `Color(0xFF${hex.replace('#', '')})`
// }
function toColor(hexOrName) {
  const namedColors = {
    blue: '2196F3',
    green: '4CAF50',
    red: 'F44336',
    black: '000000',
    white: 'FFFFFF',
    gray: '9E9E9E',
    yellow: 'FFEB3B',
    orange: 'FF9800',
    purple: '9C27B0',
    teal: '009688'
  }

  // Si es color con #
  if (hexOrName?.startsWith('#')) {
    return `Color(0xFF${hexOrName.slice(1)})`;
  }

  // Si es un color por nombre reconocido
  if (namedColors[hexOrName?.toLowerCase()]) {
    return `Color(0xFF${namedColors[hexOrName.toLowerCase()]})`;
  }

  // Por defecto, color negro
  return `Color(0xFF000000)`;
}
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}
