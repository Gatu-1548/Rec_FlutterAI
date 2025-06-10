import { capitalize } from './utils.js';

export function generateMainFile(screenList) {
  //const imports = screenList.map(s => `import 'screens/${s.id}.dart';`).join('\n')
  const firstScreen = screenList[0]?.id || 'pantalla1'
  const imports = `import 'screens/${firstScreen}.dart';`

  return `
import 'package:flutter/material.dart';
${imports}

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Proyecto Exportado',
      home: ${capitalize(screenList[0]?.id) ?? 'Pantalla1'}(),
    );
  }
}
`
}
