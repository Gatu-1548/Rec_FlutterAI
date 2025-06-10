import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generateFlutterZipFromMain(mainDartCode, projectName = 'flutter_image_ui') {
  const zip = new JSZip();

  // Agregar pubspec.yaml básico
  const pubspec = `
name: ${projectName}
description: Proyecto generado desde imagen con Gemini
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
`;

  zip.file('pubspec.yaml', pubspec);
  zip.file('lib/main.dart', mainDartCode);

  // Generar y descargar
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName}.zip`);
}