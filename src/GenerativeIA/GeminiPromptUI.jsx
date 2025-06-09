import { useState } from 'react';
import { generateUIFromPrompt } from '../services/authService';
import toast from 'react-hot-toast';
export default function GeminiPromptChatUI() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return alert('Escribe un prompt válido');
    const userMessage = { sender: 'user', text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const result = await generateUIFromPrompt(userMessage.text);
      const textResult = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      const botMessage = { sender: 'gemini', text: textResult };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'error', text: '⚠️ Error al generar la interfaz.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('exto copiado ');
  };

  const handleDownload = (text) => {
    const blob = new Blob([text], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ui_from_prompt.json';
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto p-6 w-full flex flex-col gap-4 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Chat de generación de UI</h2>

        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : msg.sender === 'gemini'
                    ? 'bg-gray-800 text-green-300 rounded-bl-none font-mono whitespace-pre-wrap'
                    : 'bg-red-600 text-white'
                }`}
              >
                {msg.text}
                {msg.sender === 'gemini' && (
                  <div className="mt-2 flex gap-2 text-sm text-white">
                    <button onClick={() => handleCopy(msg.text)} className="underline hover:text-blue-400">
                      Copiar
                    </button>
                    <button onClick={() => handleDownload(msg.text)} className="underline hover:text-green-400">
                      Descargar
                    </button>
                  </div>
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