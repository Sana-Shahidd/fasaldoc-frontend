import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { applyDir } from '../i18n'

const LANGS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ur', label: 'Urdu',    native: 'اردو'    },
  { code: 'pa', label: 'Punjabi', native: 'پنجابی'  },
  { code: 'sd', label: 'Sindhi',  native: 'سنڌي'    },
]

function normLang(raw: string) {
  return (raw ?? 'en').split('-')[0]
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen]           = useState(false)
  const [activeLang, setActiveLang] = useState(() => normLang(i18n.language))

  // Stay in sync if the language is changed from another place (e.g. Settings page)
  useEffect(() => {
    function onChanged(lng: string) {
      setActiveLang(normLang(lng))
    }
    i18n.on('languageChanged', onChanged)
    return () => { i18n.off('languageChanged', onChanged) }
  }, [i18n])

  async function select(code: string) {
    setOpen(false)            // close dropdown immediately
    setActiveLang(code)       // update highlight immediately
    applyDir(code)            // apply RTL/LTR immediately
    await i18n.changeLanguage(code)   // then apply translations
  }

  const current = LANGS.find(l => l.code === activeLang) ?? LANGS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm font-medium text-forest-800 hover:bg-earth-100 transition-colors"
      >
        <span>{current.native}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 end-0 bg-white border border-earth-200 rounded-2xl shadow-card overflow-hidden z-50 min-w-[160px]"
          >
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => select(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-earth-50 transition-colors ${
                  activeLang === lang.code
                    ? 'text-forest-800 font-semibold bg-forest-50'
                    : 'text-gray-700'
                }`}
              >
                <span>{lang.label}</span>
                {lang.native !== lang.label && (
                  <span className="text-base ml-2">{lang.native}</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
