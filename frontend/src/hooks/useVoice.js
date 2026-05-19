import { useState, useRef } from 'react'

export function useVoice(onTranscript, language = 'en') {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const voiceMap = { en: 'en-IN', kn: 'kn-IN', hi: 'hi-IN' }

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Voice input not supported in this browser. Use Chrome.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = voiceMap[language] || 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      onTranscript(transcript)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  return { listening, startListening, stopListening }
}