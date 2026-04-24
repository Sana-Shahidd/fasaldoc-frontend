import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

// BCP-47 voice tag preferences per app language, in fallback order
const VOICE_PREFS: Record<string, string[]> = {
  en: ['en-US', 'en-GB', 'en'],
  ur: ['ur-PK', 'ur'],
  // Punjabi TTS is rare — fall back to Urdu which shares the script
  pa: ['pa-PK', 'pa-IN', 'pa', 'ur-PK', 'ur'],
  // Sindhi TTS is rare — fall back to Urdu
  sd: ['sd-PK', 'sd', 'ur-PK', 'ur'],
}

function findVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  const prefs = VOICE_PREFS[lang] ?? VOICE_PREFS.en
  for (const tag of prefs) {
    const match = voices.find(v => v.lang.toLowerCase().startsWith(tag.toLowerCase()))
    if (match) return match
  }
  return voices.find(v => v.default) ?? voices[0]
}

export function useSpeech() {
  const { i18n } = useTranslation()
  const [speaking, setSpeaking] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Cancel any ongoing speech when component unmounts
  useEffect(() => () => { if (supported) window.speechSynthesis.cancel() }, [supported])

  const speak = useCallback((text: string) => {
    if (!supported || !text.trim()) return
    window.speechSynthesis.cancel()

    const lang = i18n.language.split('-')[0]
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.82
    utter.pitch = 1

    const trySpeak = () => {
      const voice = findVoice(lang)
      if (voice) utter.voice = voice
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utter)
    }

    // Voices load asynchronously on some browsers — wait if not ready
    if (window.speechSynthesis.getVoices().length > 0) {
      trySpeak()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null
        trySpeak()
      }
    }
  }, [supported, i18n.language])

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  return { speak, stop, speaking, supported }
}
