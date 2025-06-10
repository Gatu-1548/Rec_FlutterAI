/* eslint-disable no-case-declarations */
import { capitalize } from './utils.js';

// src/editor/export/generators/generateWidgetDart.js

export function generateWidgetDart(widget) {
    const x = widget.x ?? 0;
    const y = widget.y ?? 0;
    const rotation = widget.rotation ?? 0;
  
    const toColor = (hex) => {
      const clean = (hex || '#000000').replace('#', '');
      return `Color(0xFF${clean})`;
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
                color: ${toColor(widget.color)},
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
                fillColor: ${toColor(widget.color)},
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
  
      default:
        return `// Widget type '${widget.type}' not implemented yet`;
    }
}