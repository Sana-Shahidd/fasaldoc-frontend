import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Globe, Info, Leaf } from 'lucide-react'
import { applyDir } from '../i18n'

const LANGS = [
  { code: 'en', label: 'English',  native: 'English', flag: '🇬🇧' },
  { code: 'ur', label: 'Urdu',     native: 'اردو',    flag: '🇵🇰' },
  { code: 'pa', label: 'Punjabi',  native: 'پنجابی',  flag: '🇵🇰' },
  { code: 'sd', label: 'Sindhi',   native: 'سنڌي',    flag: '🇵🇰' },
]

function normLang(raw: string) {
  return (raw ?? 'en').split('-')[0]
}

export default function Settings() {
  const { t, i18n } = useTranslation()
  const [activeLang, setActiveLang] = useState(() => normLang(i18n.language))

  useEffect(() => {
    function onChanged(lng: string) { setActiveLang(normLang(lng)) }
    i18n.on('languageChanged', onChanged)
    return () => { i18n.off('languageChanged', onChanged) }
  }, [i18n])

  async function select(code: string) {
    setActiveLang(code)
    applyDir(code)
    await i18n.changeLanguage(code)
  }

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      <div className="bg-forest-800 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <div className="flex items-center gap-2.5">
          <SettingsIcon size={22} />
          <h1 className="text-xl font-bold">{t('settings.title')}</h1>
        </div>
      </div>

      <div className="px-5 md:px-8 -mt-4">
        <div className="max-w-2xl mx-auto space-y-4">
        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
              <Globe size={16} className="text-forest-700" />
            </div>
            <h2 className="font-semibold text-forest-900">{t('settings.language')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => select(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all ${
                  activeLang === lang.code
                    ? 'border-forest-600 bg-forest-50'
                    : 'border-earth-100 bg-earth-50 hover:border-earth-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-forest-900">{lang.label}</span>
                </div>
                <span className="text-sm text-gray-500">{lang.native}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
              <Info size={16} className="text-forest-700" />
            </div>
            <h2 className="font-semibold text-forest-900">{t('settings.about')}</h2>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{t('settings.about_text')}</p>

          <div className="flex items-center gap-2 pt-4 border-t border-earth-100">
            <div className="w-8 h-8 rounded-xl bg-forest-800 flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-forest-900">{t('app_name')}</p>
              <p className="text-xs text-gray-400">{t('settings.version')}</p>
            </div>
          </div>
        </motion.div>

        {/* Accuracy note */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-wheat-100 rounded-3xl p-5 border border-wheat-200">
          <p className="text-xs text-wheat-600 leading-relaxed">
            FasalDoc achieves <strong>96.1% accuracy</strong> on lab-standard leaf images. Real field accuracy depends on lighting and image quality. Always consult a local agronomist for severe outbreaks.
          </p>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
