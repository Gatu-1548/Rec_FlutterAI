import { capitalize } from './utils.js'

export function generateMainFile(screenList) {
  // Filtrar pantallas que tengan id válido
  const validScreens = screenList
    .filter(id => typeof id === 'string' && id.trim().length > 0)

  const routes = validScreens
    .map(id => `'/${id}': (context) => const ${capitalize(id)}(),`)
    .join('\n    ')

  const imports = validScreens
    .map(id => `import 'screens/${id}.dart';`)
    .join('\n')

  const initial = validScreens[0] || 'pantalla1'

  return `
import 'package:flutter/material.dart';
${imports}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Exported App',
      debugShowCheckedModeBanner: false,
      initialRoute: '/${initial}',
      routes: {
        ${routes}
      },
    );
  }
}
`
}
