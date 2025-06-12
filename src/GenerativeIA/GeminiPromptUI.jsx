import { useState } from 'react';
import { generateUIFromPrompt } from '../services/authService';
import { useWidgetStore } from '../editor/store/useWidgetStore';
import { exportToFlutterCode } from '../editor/export/flutterExporter';
import toast from 'react-hot-toast';

export default function GeminiPromptChatUI() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const widgets = useWidgetStore((state) => state.widgets);
  const setCurrentScreen = useWidgetStore((state) => state.setCurrentScreen);
  const loadWidgets = useWidgetStore((state) => state.loadWidgets);

  const handleSubmit = async () => {
    if (!prompt.trim()) return alert('Escribe un prompt válido');
    const userMessage = { sender: 'user', text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const result = await generateUIFromPrompt(userMessage.text);
      let textResult = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      textResult = textResult.trim().replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '');

      try {
        const parsed = JSON.parse(textResult);
        loadWidgets(parsed);
        toast.success('🎉 Interfaz cargada en el editor visual');
      } catch (e) {
        toast.error('⚠️ La respuesta no es JSON válido');
      }

      const botMessage = { sender: 'gemini', text: textResult };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'error', text: '⚠️ Error al generar la interfaz.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast('🎤 Escuchando...');
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      toast.error('❌ Error al reconocer voz.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      toast.success('✅ Voz convertida a texto');
    };

    recognition.start();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Texto copiado');
  };

  const handleDownload = (text) => {
    const blob = new Blob([text], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ui_from_prompt.json';
    link.click();
  };

  const handleExportFlutter = async () => {
    await exportToFlutterCode();
    toast.success('Proyecto Flutter exportado');
  };

  const handleClearWidgets = () => {
    loadWidgets({
      pantalla1: [],
      pantalla2: [],
      pantalla3: [],
      pantalla4: [],
      pantalla5: [],
    });
    toast.success('Pantallas limpiadas');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto p-6 w-full flex flex-col gap-4 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Chat de generación de UI</h2>

        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={handleExportFlutter}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Exportar a Flutter
          </button>
          <button
            onClick={handleClearWidgets}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Limpiar Widgets
          </button>
          <select
            onChange={(e) => setCurrentScreen(e.target.value)}
            className="bg-gray-800 border border-gray-600 px-3 py-2 rounded"
          >
            {Object.keys(widgets).map((pantalla) => (
              <option key={pantalla} value={pantalla}>
                {pantalla}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : msg.sender === 'gemini'
                    ? 'bg-gray-800 text-green-300 rounded-bl-none'
                    : 'bg-red-600 text-white'
                }`}
              >
                {msg.sender === 'gemini' ? (
                  <details className="text-white text-sm">
                    <summary className="cursor-pointer hover:underline">Ver detalles técnicos (JSON)</summary>
                    <pre className="whitespace-pre-wrap mt-2">{msg.text}</pre>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => handleCopy(msg.text)} className="underline hover:text-blue-400">
                        Copiar
                      </button>
                      <button onClick={() => handleDownload(msg.text)} className="underline hover:text-green-400">
                        Descargar
                      </button>
                    </div>
                  </details>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe una interfaz que quieras generar..."
            className="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={handleVoiceInput}
            className={`px-4 py-2 rounded ${
              isListening ? 'bg-red-600' : 'bg-gray-600'
            } text-white`}
          >
            🎤
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white"
          >
            {loading ? 'Generando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}