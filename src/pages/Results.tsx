import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, MapPin, RefreshCcw, Eye, Volume2, VolumeX } from 'lucide-react'
import { useStore } from '../store/store'
import { fetchGradCAM } from '../api/client'
import SeverityBadge from '../components/SeverityBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSpeech } from '../hooks/useSpeech'

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-earth-100 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className={`h-2 rounded-full ${
          value >= 0.85 ? 'bg-severity-high' : value >= 0.65 ? 'bg-severity-moderate' : 'bg-severity-low'
        }`}
      />
    </div>
  )
}

export default function Results() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lastResult, lastFile, clearResult } = useStore(s => ({
    lastResult: s.lastResult,
    lastFile:   s.lastFile,
    clearResult: s.clearResult,
  }))
  const { speak, stop, speaking, supported } = useSpeech()

  const [gradcam, setGradcam] = useState<string | null>(null)
  const [gradcamLoading, setGradcamLoading] = useState(false)
  const [showGradcam, setShowGradcam] = useState(false)

  // Build the text to speak — must be before any early return (hooks rules)
  const spokenText = useMemo(() => {
    if (!lastResult || lastResult.no_plant_detected) return ''
    const lang = i18n.language.split('-')[0]
    // For Urdu/Punjabi/Sindhi, prefer urdu_name (Nastaliq script, same TTS engine)
    if (lang !== 'en' && lastResult.treatment?.urdu_name) return lastResult.treatment.urdu_name
    return lastResult.treatment?.disease_name ?? lastResult.top_prediction.disease_name
  }, [lastResult, i18n.language])

  // Auto-speak once when the diagnosis loads — helps illiterate farmers hear the result
  const autoSpokenRef = useRef(false)
  useEffect(() => {
    if (!autoSpokenRef.current && spokenText && supported) {
      autoSpokenRef.current = true
      const timer = setTimeout(() => speak(spokenText), 900)
      return () => clearTimeout(timer)
    }
  }, [spokenText, speak, supported])

  useEffect(() => {
    if (!lastResult) navigate('/', { replace: true })
  }, [lastResult, navigate])

  useEffect(() => {
    if (!lastFile || !lastResult?.gradcam_url) return
    setGradcamLoading(true)
    fetchGradCAM(lastFile)
      .then(r => setGradcam(r.gradcam_image))
      .catch(() => null)
      .finally(() => setGradcamLoading(false))
  }, [lastFile, lastResult])

  if (!lastResult) return null

  const { top_prediction, top_3, severity, no_plant_detected, treatment } = lastResult
  const medicines = treatment?.chemical_treatment.map(c => c.name) ?? []

  if (no_plant_detected) {
    return (
      <div className="min-h-screen bg-earth-50 flex flex-col items-center justify-center px-6 pb-28 md:pb-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-xl font-bold text-forest-900 mb-3">{t('home.no_plant')}</h2>
          <button
            onClick={() => { clearResult(); navigate('/') }}
            className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-forest-800 text-white rounded-2xl font-semibold"
          >
            <RefreshCcw size={18} />
            {t('results.scan_again')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      {/* Header */}
      <div className="bg-forest-800 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <button onClick={() => { clearResult(); navigate('/') }} className="flex items-center gap-1.5 text-forest-200 mb-4 text-sm">
          <ArrowLeft size={16} />
          {t('results.scan_again')}
        </button>
        <h1 className="text-xl font-bold mb-1">{t('results.title')}</h1>
        {treatment && <p className="text-forest-200 text-sm">{treatment.disease_name}</p>}
      </div>

      <div className="px-5 md:px-8 -mt-4">
        <div className="max-w-5xl mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-6 md:items-start space-y-4 md:space-y-0">
            {/* Left column: main card + grad-cam */}
            <div className="space-y-4">
              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-5 shadow-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-forest-900 leading-tight">
                      {treatment?.disease_name ?? top_prediction.disease_name}
                    </h2>
                    {treatment?.urdu_name && (
                      <p className="text-sm text-forest-600 mt-0.5" dir="rtl">{treatment.urdu_name}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {/* TTS speaker button — farmer taps to hear the disease name in their language */}
                    {supported && spokenText && (
                      <button
                        onClick={speaking ? stop : () => speak(spokenText)}
                        title={speaking ? t('results.speaking') : t('results.speak')}
                        className={`p-2 rounded-full border transition-colors ${
                          speaking
                            ? 'bg-severity-high/10 border-severity-high text-severity-high'
                            : 'bg-forest-50 border-forest-200 text-forest-700 hover:bg-forest-100'
                        }`}
                      >
                        {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    )}
                    <SeverityBadge severity={severity} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{t('results.confidence')}</span>
                    <span className="font-semibold text-forest-800">{(top_prediction.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <ConfidenceBar value={top_prediction.confidence} />
                </div>

                {treatment && (
                  <div className="mt-4 flex gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-earth-100 text-forest-700 rounded-full capitalize">
                      {t(`treatment.cause_${treatment.cause}`)}
                    </span>
                    <span className="px-2.5 py-1 bg-earth-100 text-forest-700 rounded-full">{treatment.crop}</span>
                  </div>
                )}
              </motion.div>

              {/* Grad-CAM */}
              {lastResult.gradcam_url && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-5 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-forest-900 text-sm">{t('results.gradcam_title')}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{t('results.gradcam_subtitle')}</p>
                    </div>
                    <button
                      onClick={() => setShowGradcam(v => !v)}
                      className="flex items-center gap-1 text-xs text-forest-700 font-medium px-3 py-1.5 bg-forest-50 rounded-xl"
                    >
                      <Eye size={13} />
                      {showGradcam ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showGradcam && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        {gradcamLoading ? (
                          <div className="flex justify-center py-8">
                            <LoadingSpinner size={36} label={t('results.loading_gradcam')} />
                          </div>
                        ) : gradcam ? (
                          <img
                            src={`data:image/png;base64,${gradcam}`}
                            alt="Grad-CAM"
                            className="w-full rounded-2xl object-cover"
                          />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Right column: top 3 + actions */}
            <div className="space-y-4">
              {/* Top 3 */}
              {top_3.length > 1 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-3xl p-5 shadow-card">
                  <h3 className="font-semibold text-forest-900 mb-3 text-sm">{t('results.top3')}</h3>
                  <div className="space-y-3">
                    {top_3.slice(1).map((pred) => (
                      <div key={pred.label_key} className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span className="truncate">{pred.disease_name}</span>
                          <span className="font-medium ml-2">{(pred.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <ConfidenceBar value={pred.confidence} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
                {treatment && (
                  <button
                    onClick={() => navigate(`/treatment/${top_prediction.label_key}`)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-forest-800 text-white rounded-2xl font-semibold shadow-card hover:bg-forest-700 transition-colors"
                  >
                    <span>{t('results.view_treatment')}</span>
                    <ChevronRight size={20} />
                  </button>
                )}

                <button
                  onClick={() => navigate('/shops', { state: { medicines } })}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white text-forest-800 rounded-2xl font-semibold border-2 border-forest-200 hover:border-forest-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{t('results.find_shops')}</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
