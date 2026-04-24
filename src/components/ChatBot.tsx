import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X, Send, Mic, MicOff, Bot, User } from 'lucide-react'
import { getResponse } from '../data/chatbot-kb'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  ts: number
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function BotMessage({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-2 items-end"
    >
      <div className="w-7 h-7 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0 mb-1">
        <Bot size={14} className="text-white" />
      </div>
      <div className="max-w-[80%]">
        <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        </div>
        <span className="text-xs text-gray-400 px-1 mt-1 block">{formatTime(msg.ts)}</span>
      </div>
    </motion.div>
  )
}

function UserMessage({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-2 items-end justify-end"
    >
      <div className="max-w-[80%]">
        <div className="bg-forest-800 rounded-2xl rounded-br-sm px-4 py-3">
          <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        </div>
        <span className="text-xs text-gray-400 px-1 mt-1 block text-right">{formatTime(msg.ts)}</span>
      </div>
      <div className="w-7 h-7 rounded-full bg-earth-200 flex items-center justify-center flex-shrink-0 mb-1">
        <User size={14} className="text-forest-700" />
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-7 h-7 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-white" />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
        <div className="flex gap-1 items-center h-4">
          {[0, 0.2, 0.4].map(d => (
            <motion.div
              key={d}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: d, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-forest-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatBot() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.slice(0, 2) as 'en' | 'ur' | 'pa' | 'sd') ?? 'en'

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [msgs, setMsgs] = useState<Message[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { status: voiceStatus, transcript, startListening, stopListening, isSupported, setTranscript } =
    useSpeechRecognition(lang)

  // Populate transcript into input on voice result
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
      setTranscript('')
    }
  }, [transcript, setTranscript])

  // Greeting on first open
  useEffect(() => {
    if (open && msgs.length === 0) {
      const greeting = getResponse('hello', lang)
      setMsgs([{ id: 'init', role: 'bot', text: greeting, ts: Date.now() }])
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  function send(text?: string) {
    const query = (text ?? input).trim()
    if (!query) return

    const userMsg: Message = { id: `u${Date.now()}`, role: 'user', text: query, ts: Date.now() }
    setMsgs(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botText = getResponse(query, lang)
      setMsgs(m => [...m, { id: `b${Date.now()}`, role: 'bot', text: botText, ts: Date.now() }])
      setTyping(false)
    }, 800 + Math.random() * 600)
  }

  const isListening = voiceStatus === 'listening'

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-forest-800 text-white shadow-float flex items-center justify-center"
            aria-label={t('chat.title')}
          >
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-wheat-500 border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 inset-x-0 md:inset-x-auto md:bottom-8 md:right-8 md:w-96 z-50 flex flex-col bg-earth-50 rounded-t-3xl md:rounded-3xl shadow-float"
            style={{ maxHeight: '82vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-forest-800 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t('chat.title')}</p>
                  <p className="text-forest-200 text-xs">{t('chat.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {msgs.map(msg =>
                msg.role === 'bot'
                  ? <BotMessage key={msg.id} msg={msg} />
                  : <UserMessage key={msg.id} msg={msg} />
              )}
              {typing && <TypingIndicator />}
              <div ref={endRef} />
            </div>

            {/* Quick suggestion chips */}
            {msgs.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {['Photo tips', 'Wheat disease', 'Organic spray', 'When to spray'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="flex-shrink-0 px-3 py-1.5 bg-white border border-earth-200 text-forest-700 rounded-full text-xs font-medium hover:bg-forest-50 transition-colors shadow-soft"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="px-4 pb-6 pt-2 bg-white border-t border-earth-100">
              <div className="flex gap-2 items-center bg-earth-50 rounded-2xl px-4 py-2 border border-earth-200">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder={isListening ? t('chat.listening') : t('chat.placeholder')}
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                  dir="auto"
                />

                {isSupported && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={isListening ? stopListening : startListening}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : voiceStatus === 'error'
                        ? 'bg-orange-100 text-orange-500'
                        : 'bg-earth-200 text-forest-600'
                    }`}
                  >
                    {isListening ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                        <MicOff size={14} />
                      </motion.div>
                    ) : (
                      <Mic size={14} />
                    )}
                  </motion.button>
                )}

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
                >
                  <Send size={14} />
                </motion.button>
              </div>

              {isListening && (
                <p className="text-xs text-center text-red-500 mt-2 animate-pulse">{t('chat.listening')}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  )
}
