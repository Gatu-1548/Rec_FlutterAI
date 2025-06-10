import { useState } from 'react';
import { generateUIFromImage } from '../services/authService';
import { generateFlutterZipFromMain } from './parser/Generator';

export default function GeminiImageUI() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [jsonCode, setJsonCode] = useState('');
  const [mainCode, setMainCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreview(imageUrl);
    setJsonCode('');
    setMainCode('');
    setError('');
  };

  const handleSendImage = async () => {
  if (!file) return;

  setLoading(true);
  setError('');
  setJsonCode('');
  setMainCode('');

  try {
    const result = await generateUIFromImage(file);
    let cleanResult = typeof result === 'string' ? result : JSON.stringify(result);

    // Limpiar posible envoltorio Markdown
    cleanResult = cleanResult
      .replace(/^```(json|dart)?\s*/, '')
      .replace(/```$/, '')
      .trim();

    // 🔍 Verificar si es código Dart (main.dart)
    if (cleanResult.includes('void main()') && cleanResult.includes('MaterialApp')) {
      setMainCode(cleanResult);
    } else {
      throw new Error("El resultado no contiene un main.dart válido.");
    }
  } catch (err) {
    setError('Ocurrió un error al generar el código Dart.');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const handleCancelImage = () => {
    setFile(null);
    setPreview(null);
    setJsonCode('');
    setMainCode('');
    setError('');
    setShowPreview(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonCode], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ui_generated.json';
    link.click();
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-screen-md mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">Generar UI desde Imagen</h2>

        {!preview && (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-6xl">📤</div>
            <p className="mt-4 text-lg font-semibold text-gray-300">Haz clic o arrastra una imagen para subir</p>
            <p className="text-sm text-gray-500">Formatos permitidos: JPG, PNG</p>
          </label>
        )}

        {preview && (
          <div className="flex flex-col items-center gap-4">
            <img
              src={preview}
              alt="Imagen seleccionada"
              className="max-w-xs rounded-lg border border-gray-700 shadow"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSendImage}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold"
              >
                {loading ? 'Generando...' : 'Enviar Imagen'}
              </button>
              <button
                onClick={handleCancelImage}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white font-semibold"
              >
                Cancelar Imagen
              </button>
            </div>
          </div>
        )}

        {loading && <p className="text-yellow-400 text-center">Generando UI desde imagen...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Si generó código JSON */}
        {jsonCode && (
          <>
            <h3 className="text-xl font-semibold">🧾 Código JSON generado:</h3>
            <textarea
              value={jsonCode}
              readOnly
              rows={15}
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white font-mono"
            />

            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleCopy(jsonCode)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                Copiar JSON
              </button>
              <button onClick={handleDownloadJson} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
                Descargar JSON
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
              >
                {showPreview ? 'Ocultar vista previa' : 'Ver JSON formateado'}
              </button>
            </div>

            {showPreview && (
              <div className="bg-gray-100 text-gray-800 p-4 mt-4 rounded overflow-x-auto">
                <pre>{jsonCode}</pre>
              </div>
            )}
          </>
        )}

        {/* Si generó código Dart (main.dart) */}
        {mainCode && (
          <>
            <h3 className="text-xl font-semibold">📱 Código Flutter generado:</h3>
            <textarea
              value={mainCode}
              readOnly
              rows={18}
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white font-mono"
            />

            <div className="flex flex-wrap gap-3 mt-4">
              <button onClick={() => handleCopy(mainCode)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                Copiar Dart
              </button>
              <button
                onClick={() => generateFlutterZipFromMain(mainCode)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                Descargar Flutter ZIP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}