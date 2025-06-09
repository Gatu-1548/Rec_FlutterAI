// src/editor/export/generators/generatePubspec.js
export function generatePubspecYaml(projectName = 'flutter_project_exportado') {
    return `
  name: ${projectName}
  description: Proyecto exportado desde el editor web
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
  }
  