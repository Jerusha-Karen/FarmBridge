import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../utils/api'
import { useVoice } from '../hooks/useVoice'
import { LANGUAGES } from '../utils/constants'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: '🌾 Namaskara! I am FarmBridge AI, your farming assistant.\n\nAsk me anything about crops, pests, soil, or government schemes. You can type or use the 🎤 voice button to speak in Kannada, Hindi, or English.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('en')
  const bottomRef = useRef(null)

  const { listening, startListening } = useVoice(
    (transcript) => setInput(transcript),
    language
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const res = await sendMessage(userMsg, language)
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.answer }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '⚠️ Sorry, could not connect to the server. Please try again.'
      }])
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const speak = (text) => {
    const lang = LANGUAGES.find(l => l.code === language)
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang?.voice || 'en-IN'
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-64px)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🤖 AI Farming Assistant</h1>
          <p className="text-sm text-gray-500">Powered by Gemini AI + RAG</p>
        </div>
        {/* Language selector */}
        <div className="flex gap-2">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition
                ${language === l.code
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 text-gray-600 hover:border-primary'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === 'user'
                ? 'bg-primary text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}>

              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">🌾 FarmBridge AI</span>
                  <button
                    onClick={() => speak(msg.text)}
                    className="text-xs text-gray-400 hover:text-primary"
                    title="Listen"
                  >
                    🔊
                  </button>
                </div>
              )}

              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm
              px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="text-xs text-gray-400 mr-2">Thinking</span>
                {[0,1,2].map(i => (
                  <div key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2 items-end">
        <button
          onClick={startListening}
          className={`p-3 rounded-full transition flex-shrink-0 shadow
            ${listening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-green-100 text-primary hover:bg-green-200'}`}
          title="Speak"
        >
          {listening ? '⏹' : '🎤'}
        </button>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={
            language === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...' :
            language === 'hi' ? 'अपना सवाल टाइप करें...' :
            'Type your farming question...'
          }
          rows={1}
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm
            resize-none focus:outline-none focus:border-primary focus:ring-1
            focus:ring-primary"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="p-3 bg-primary text-white rounded-full hover:bg-secondary
            transition disabled:opacity-40 flex-shrink-0 shadow"
        >
          ➤
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-2">
        Press 🎤 to speak in {LANGUAGES.find(l => l.code === language)?.label}
      </p>
    </div>
  )
}