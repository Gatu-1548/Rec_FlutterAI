// 📁 src/editor/export/flutterExporter.js
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { useWidgetStore } from '../store/useWidgetStore'
import { generatePubspecYaml } from '../export/generators/generatePubspec'
import { generateMainFile } from '../export/generators/generateMainFile'
import { generateScreenFile } from '../export/generators/generateScreenFile'

export async function exportToFlutterCode() {
  const zip = new JSZip()
  const state = useWidgetStore.getState()

  // Agregar pubspec.yaml
  zip.file('pubspec.yaml', generatePubspecYaml())

  // Lista de pantallas como objetos con id
  const screenList = Object.keys(state.widgets).map(id => ({ id }))

  // Agregar main.dart
  zip.file('lib/main.dart', generateMainFile(screenList))

  // Agregar pantallas en lib/screens/
  Object.entries(state.widgets).forEach(([screenId, widgets]) => {
    const dartCode = generateScreenFile(screenId, widgets)
    zip.file(`lib/screens/${screenId}.dart`, dartCode)
  })

  // Generar y descargar el ZIP
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'flutter_project_exportado.zip')
}
