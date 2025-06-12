/* eslint-disable no-useless-escape */
/* eslint-disable no-case-declarations */
import { capitalize } from './utils.js';

// src/editor/export/generators/generateWidgetDart.js

export function generateWidgetDart(widget) {
    const x = widget.x ?? 0;
    const y = widget.y ?? 0;
    const rotation = widget.rotation ?? 0;
  
    // const toColor = (hex) => {
    //   const clean = (hex || '#000000').replace('#', '');
    //   return `Color(0xFF${clean})`;
    // };

    const toColor = (hexOrName) => {
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
    teal: '009688',
  };

  if (!hexOrName) return `Color(0xFF000000)`; // negro por defecto

  const cleanInput = hexOrName.trim().toLowerCase();

  if (cleanInput.startsWith('#')) {
    return `Color(0xFF${cleanInput.slice(1)})`;
  }

  if (namedColors[cleanInput]) {
    return `Color(0xFF${namedColors[cleanInput]})`;
  }

  return `Color(0xFF000000)`; // negro si no se reconoce
};
  
    const transform = rotation !== 0
      ? `\n        transform: Matrix4.rotationZ(${rotation * (Math.PI / 180)}),`
      : '';

    const generateNavigateTo = (navigateTo) => {
      if (!navigateTo) return '';
      return `Navigator.push(context, MaterialPageRoute(builder: (_) => ${capitalize(navigateTo)}()));`;
    };
  
    switch (widget.type) {
      case 'text':
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: Text(
            '${widget.text || ''}',
            style: TextStyle(
              fontSize: ${widget.fontSize || 14},
              color: ${toColor(widget.color)},
              fontWeight: FontWeight.${widget.fontWeight || 'normal'},
            ),
          ),
        )`;
  
      case 'button':
        return `Positioned(
          left: ${widget.x || 0}, top: ${widget.y || 0},
          child: Builder(
            builder: (context) => ElevatedButton(
              onPressed: () {
                ${generateNavigateTo(widget.navigateTo)}
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: ${toColor(widget.color)},
                padding: EdgeInsets.symmetric(
                  horizontal: ${widget.paddingHorizontal || 16}, 
                  vertical: ${widget.paddingVertical || 8},
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(${widget.borderRadius || 8}),
                ),
              ),
              child: Text(
                '${widget.text || 'Button'}',
                style: TextStyle(
                  color: ${toColor(widget.textColor)},
                  fontSize: ${widget.fontSize || 14},
                ),
              ),
            ),
          ),
        )`;
  
      case 'image':
        const imageOnTap = widget.navigateTo 
          ? `onTap: () {
              ${generateNavigateTo(widget.navigateTo)}
            },`
          : '';
        
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: GestureDetector(
            ${imageOnTap}
            child: SizedBox(
              width: ${widget.width || 100},
              height: ${widget.height || 100},
              child: Image.network(
                '${widget.src || 'https://via.placeholder.com/100'}',
                fit: BoxFit.${widget.fit || 'cover'},
              ),
            ),
          ),
        )`;
  
      case 'container':
        const containerOnTap = widget.navigateTo 
          ? `onTap: () {
              ${generateNavigateTo(widget.navigateTo)}
            },`
          : '';
        
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: GestureDetector(
            ${containerOnTap}
            child: Container(
              width: ${widget.width || 200},
              height: ${widget.height || 150},
              decoration: BoxDecoration(
                color: ${toColor(widget.backgroundColor || widget.color)},
                borderRadius: BorderRadius.circular(${widget.borderRadius || 8}),
                boxShadow: ${widget.shadow ? `[BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 4, offset: Offset(0, 2))]` : '[]'},
              ),
            ),
          ),
        )`;
  
      case 'checkbox':
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Checkbox(
                value: ${widget.checked ?? false},
                onChanged: (value) {},
                activeColor: ${toColor(widget.color)},
              ),
              SizedBox(width: 8),
              Text(
                '${widget.text || 'Checkbox'}',
                style: TextStyle(
                  fontSize: ${widget.fontSize || 14},
                  color: ${toColor(widget.textColor)},
                ),
              ),
            ],
          ),
        )`;
  
      case 'input':
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: SizedBox(
            width: ${widget.width || 200},
            child: TextField(
              decoration: InputDecoration(
                hintText: '${widget.placeholder || ''}',
                filled: true,
                fillColor: ${toColor(widget.backgroundColor || widget.color || '#ffffff')},
                border: OutlineInputBorder(),
                contentPadding: EdgeInsets.symmetric(
                  horizontal: ${widget.paddingHorizontal || 12},
                  vertical: ${widget.paddingVertical || 8},
                ),
              ),
              style: TextStyle(
                fontSize: ${widget.fontSize || 14},
                color: ${toColor(widget.textColor)},
              ),
            ),
          ),
        )`;
  
      case 'list':
        const items = (widget.items || []).map(item => `
          ListTile(
            onTap: () {
              ${generateNavigateTo(widget.navigateTo)}
            },
            title: Text(
              '${item}',
              style: TextStyle(
                fontSize: ${widget.fontSize || 14},
                color: ${toColor(widget.textColor || '#374151')},
              ),
            ),
          )`).join(',');
  
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: Container(
            width: ${widget.width || 200},
            decoration: BoxDecoration(
              color: ${toColor(widget.backgroundColor)},
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [${items}],
            ),
          ),
        )`;
  
      case 'form':
        const formButtonOnPressed = widget.navigateTo 
          ? `onPressed: () {
              ${generateNavigateTo(widget.navigateTo)}
            },`
          : 'onPressed: () {},';
        
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: Container(
            width: ${widget.width || 300},
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: ${toColor(widget.backgroundColor)},
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: ${toColor(widget.borderColor)},
                width: 1,
              ),
            ),
            child: Column(
              children: [
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Nombre',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 12),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 12),
                ElevatedButton(
                  ${formButtonOnPressed}
                  style: ElevatedButton.styleFrom(
                    backgroundColor: ${toColor(widget.buttonColor)},
                  ),
                  child: Text('${widget.buttonText || 'Enviar'}'),
                ),
              ],
            ),
          ),
        )`;
  
      case 'appbar':
        const appBarActions = widget.showActions 
          ? `actions: [
              IconButton(
                icon: Icon(Icons.search), 
                onPressed: () {
                  ${generateNavigateTo(widget.navigateTo)}
                },
              ),
              IconButton(
                icon: Icon(Icons.more_vert), 
                onPressed: () {
                  ${generateNavigateTo(widget.navigateTo)}
                },
              )
            ]`
          : 'actions: []';
        
        return `AppBar(
          title: Text('${widget.text || 'App Title'}'),
          backgroundColor: ${toColor(widget.backgroundColor)},
          foregroundColor: ${toColor(widget.textColor)},
          elevation: ${widget.elevation ? 4 : 0},
          automaticallyImplyLeading: ${widget.showBackButton ?? false},
          ${appBarActions},
        )`;
  
      case 'bottomnav':
        const bottomNavOnTap = widget.navigateTo 
          ? `onTap: (index) {
              if (index == ${widget.defaultActive || 0}) {
                ${generateNavigateTo(widget.navigateTo)}
              }
            },`
          : '';
        
        return `BottomNavigationBar(
          ${bottomNavOnTap}
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Inicio'),
            BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Stats'),
            BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alertas'),
            BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Ajustes'),
          ],
          currentIndex: ${widget.defaultActive || 0},
          selectedItemColor: ${toColor(widget.activeColor)},
          unselectedItemColor: ${toColor(widget.inactiveColor)},
          backgroundColor: ${toColor(widget.backgroundColor)},
          showUnselectedLabels: ${widget.showLabels !== false},
        )`;

        case 'dropdown':
  return `Positioned(
    left: ${widget.x}, top: ${widget.y},
    child: SizedBox(
      width: ${widget.width || 250},
      child: DropdownButtonFormField<String>(
        value: '${widget.items?.[0] || ''}',
        items: ${JSON.stringify(widget.items || ['Opción 1'])}.map((item) {
          return DropdownMenuItem(value: item, child: Text(item));
        }).toList(),
        onChanged: (value) {},
        decoration: InputDecoration(
          labelText: '${widget.label || 'Seleccione'}',
          border: OutlineInputBorder(),
        ),
      ),
    ),
    )`;
    case 'switch':
      return `Positioned(
        left: ${x}, top: ${y},${transform}
        child: Row(
          children: [
            Text('Switch'),
            Switch(
              value: ${widget.checked ?? false},
              onChanged: (value) {},
              activeColor: ${toColor(widget.color)},
            ),
          ],
        ),
      )`;
      case 'slider':
        return `Positioned(
          left: ${x}, top: ${y},${transform}
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Valor: \${${widget.value ?? 50}}'),
              Slider(
                value: ${widget.value ?? 50}.toDouble(),
                min: ${widget.min ?? 0}.toDouble(),
                max: ${widget.max ?? 100}.toDouble(),
                onChanged: (value) {},
                activeColor: Colors.blue,
              ),
            ],
          ),
        )`;
        case 'radio':
          return `Positioned(
            left: ${x}, top: ${y},${transform}
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: ${JSON.stringify(widget.options || ['Opción A', 'Opción B'])}.map((option) {
                return RadioListTile(
                  title: Text(option),
                  value: option,
                  groupValue: '${widget.selected || widget.options?.[0] || ''}',
                  onChanged: (value) {},
                );
              }).toList(),
            ),
          )`;
          case 'card':
            return `Positioned(
              left: ${x}, top: ${y},${transform}
              child: Card(
                elevation: ${widget.elevation ? 4 : 0},
                color: ${toColor(widget.color)},
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(${widget.borderRadius || 8}),
                ),
                child: SizedBox(
                  width: ${widget.width || 200},
                  height: ${widget.height || 120},
                  child: Padding(
                    padding: EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Título de Card'),
                        SizedBox(height: 8),
                        Text('Contenido dentro del Card'),
                      ],
                    ),
                  ),
                ),
              ),
            )`;
            case 'tabs':
              return `Positioned(
                left: ${x}, top: ${y},${transform}
                child: DefaultTabController(
                  length: ${widget.tabs?.length || 3},
                  initialIndex: ${widget.selectedIndex || 0},
                  child: Column(
                    children: [
                      TabBar(
                        labelColor: Colors.blue,
                        unselectedLabelColor: Colors.grey,
                        tabs: ${JSON.stringify(widget.tabs || ['Tab 1', 'Tab 2'])}.map((label) => Tab(text: label)).toList(),
                      ),
                      Container(
                        height: ${widget.height || 150} - 40,
                        child: TabBarView(
                          children: ${JSON.stringify(widget.tabs || ['Tab 1', 'Tab 2'])}.map((label) => Center(child: Text('Contenido de \$label'))).toList(),
                        ),
                      )
                    ],
                  ),
                ),
              )`;
              case 'calendar':
                return `Positioned(
                  left: ${x}, top: ${y},${transform}
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Fecha seleccionada: ${widget.selectedDate || '2025-06-10'}'),
                      ElevatedButton(
                        onPressed: () async {
                          DateTime? picked = await showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime(2000),
                            lastDate: DateTime(2100),
                          );
                        },
                        child: Text('Seleccionar Fecha'),
                      ),
                    ],
                  ),
                )`;
                case 'drawer':
                  return `
                drawer: Drawer(
                  child: ListView(
                    padding: EdgeInsets.zero,
                    children: [
                      DrawerHeader(
                        decoration: BoxDecoration(color: Colors.blue),
                        child: Text('Menú'),
                      ),
                      ${widget.items?.map(
                        (item) => `ListTile(
                        title: Text('${item}'),
                        onTap: () {
                          // Navigator.push...
                        },
                      )`
                      ).join(',')}
                    ],
                  ),
                ),`
                
                case 'panel':
                  return `Positioned(
                    left: ${x}, top: ${y},${transform}
                    child: Container(
                      width: ${widget.width || 260},
                      height: ${widget.height || 180},
                      decoration: BoxDecoration(
                        color: ${toColor(widget.backgroundColor)},
                        borderRadius: BorderRadius.circular(${widget.borderRadius || 8}),
                        border: ${widget.border ? `Border.all(color: Colors.grey)` : 'null'},
                      ),
                      child: ${widget.scrollable ? 'SingleChildScrollView(' : ''}
                        Padding(
                          padding: EdgeInsets.all(8),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Este es un panel'),
                              SizedBox(height: 12),
                              Text('Contenido de prueba...'),
                            ],
                          ),
                        )
                      ${widget.scrollable ? ')' : ''},
                    ),
                  )`;
      default:
        return `// Widget type '${widget.type}' not implemented yet`;
    }
}