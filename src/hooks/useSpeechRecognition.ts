import { useCallback, useEffect, useRef, useState } from 'react'

export type SpeechStatus = 'idle' | 'listening' | 'error' | 'unsupported'

const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  ur: 'ur-PK',
  pa: 'pa-IN',
  sd: 'ur-PK',
}

export function useSpeechRecognition(lang = 'en') {
  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [transcript, setTranscript] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null)

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  useEffect(() => {
    if (!isSupported) { setStatus('unsupported'); return }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec: any = new SR()
    rec.continuous = false
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.lang = LANG_MAP[lang] ?? 'en-US'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      setTranscript(e.results[0][0].transcript)
      setStatus('idle')
    }
    rec.onerror = () => {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
    rec.onend = () => setStatus(s => (s === 'listening' ? 'idle' : s))

    recRef.current = rec
    return () => rec.abort()
  }, [lang, isSupported])

  const startListening = useCallback(() => {
    if (!recRef.current || !isSupported) return
    try { setTranscript(''); setStatus('listening'); recRef.current.start() } catch { /**/ }
  }, [isSupported])

  const stopListening = useCallback(() => {
    recRef.current?.stop()
    setStatus('idle')
  }, [])

  return { status, transcript, startListening, stopListening, isSupported, setTranscript }
}
