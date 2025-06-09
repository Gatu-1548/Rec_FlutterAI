// 📁 src/editor/export/generators/generateScreenFile.js
import { generateWidgetDart } from './generateWidgetDart.js'

export function generateScreenFile(screenId, widgets) {
  const className = capitalize(screenId)

  // AppBar y BottomNav si existen
  const appBarWidget = widgets.find(w => w.type === 'appbar')
  const bottomNavWidget = widgets.find(w => w.type === 'bottomnav')

  // Resto de widgets en Stack
  const positionedWidgets = widgets
    .filter(w => w.type !== 'appbar' && w.type !== 'bottomnav')
    .map(generateWidgetDart)
    .join(',\n          ')

  return `
import 'package:flutter/material.dart';

class ${className} extends StatelessWidget {
  const ${className}({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ${appBarWidget ? `appBar: ${generateAppBar(appBarWidget)},` : ''}
      body: Stack(
        children: [
          ${positionedWidgets}
        ],
      ),
      ${bottomNavWidget ? `bottomNavigationBar: ${generateBottomNav(bottomNavWidget)},` : ''}
    );
  }
}
`
}

// 🎯 AppBar generator
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

// 🎯 BottomNavigationBar generator
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
          // TODO: agregar navegación si deseas
        },
      )`
}


function toColor(hex) {
  return `Color(0xFF${hex.replace('#', '')})`
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}
