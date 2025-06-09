export function generateMainFile() {
    return `
  import 'package:flutter/material.dart';
import 'screens/pantalla1.dart';
import 'screens/pantalla2.dart'; 

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
      initialRoute: '/pantalla1', 
      routes: {
        '/pantalla1': (context) => const Pantalla1(),
        '/pantalla2': (context) =>const Pantalla2(),
      },
    );
  }
}

  `
  }
  