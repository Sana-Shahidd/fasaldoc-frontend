import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Sprout, Beaker, ShieldCheck, AlertTriangle, Volume2, VolumeX } from 'lucide-react'
import { useStore } from '../store/store'
import { useSpeech } from '../hooks/useSpeech'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item:      { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } },
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={stagger.item} className="bg-white rounded-3xl p-5 shadow-card">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
          <Icon size={16} className="text-forest-700" />
        </div>
        <h3 className="font-semibold text-forest-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

export default function Treatment() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { labelKey } = useParams<{ labelKey: string }>()
  const lastResult = useStore(s => s.lastResult)
  const treatment = lastResult?.treatment
  const { speak, stop, speaking, supported } = useSpeech()

  // Build full read-aloud text from all treatment sections
  const fullText = useMemo(() => {
    if (!treatment) return ''
    const lang = i18n.language.split('-')[0]
    const diseaseName = (lang !== 'en' && treatment.urdu_name) ? treatment.urdu_name : treatment.disease_name
    const parts: string[] = [diseaseName]

    if (treatment.symptoms.length > 0) {
      parts.push(t('treatment.symptoms') + ': ' + treatment.symptoms.join('. '))
    }
    if (treatment.organic_treatment.length > 0) {
      parts.push(t('treatment.organic') + ': ' + treatment.organic_treatment.join('. '))
    }
    if (treatment.chemical_treatment.length > 0) {
      const chemicals = treatment.chemical_treatment.map(c =>
        `${c.name}, ${t('treatment.dosage')}: ${c.dosage}, ${t('treatment.frequency')}: ${c.frequency}`
      ).join('. ')
      parts.push(t('treatment.chemical') + ': ' + chemicals)
    }
    if (treatment.prevention.length > 0) {
      parts.push(t('treatment.prevention') + ': ' + treatment.prevention.join('. '))
    }
    return parts.join('. ')
  }, [treatment, i18n.language, t])

  if (!treatment || treatment.label_key !== labelKey) {
    return (
      <div className="min-h-screen bg-earth-50 flex flex-col items-center justify-center px-6 pb-28 md:pb-8">
        <p className="text-gray-500 mb-4">Treatment not found.</p>
        <button onClick={() => navigate(-1)} className="px-5 py-3 bg-forest-800 text-white rounded-2xl">Go Back</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      {/* Header */}
      <div className="bg-forest-800 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-forest-200 mb-4 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{t('treatment.title')}</h1>
            <p className="text-forest-200 text-sm mt-1">{treatment.disease_name}</p>
          </div>

          {/* Read-aloud toggle button */}
          {supported && fullText && (
            <button
              onClick={speaking ? stop : () => speak(fullText)}
              title={speaking ? t('treatment.stop_reading') : t('treatment.read_aloud')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-sm font-medium transition-colors flex-shrink-0 mt-1 ${
                speaking
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'bg-white/10 text-forest-100 border border-white/20 hover:bg-white/20'
              }`}
            >
              {speaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span className="hidden sm:inline">
                {speaking ? t('treatment.stop_reading') : t('treatment.read_aloud')}
              </span>
            </button>
          )}
        </div>
      </div>

      <motion.div
        variants={stagger.container}
        initial="initial"
        animate="animate"
        className="px-5 md:px-8 -mt-4"
      >
        <div className="max-w-5xl mx-auto space-y-4">
        {/* Overview */}
        <motion.div variants={stagger.item} className="bg-white rounded-3xl p-5 shadow-card">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">{t('treatment.crop')}</p>
              <p className="font-semibold text-forest-900 text-sm">{treatment.crop}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{t('treatment.cause')}</p>
              <p className="font-semibold text-forest-900 text-sm capitalize">{t(`treatment.cause_${treatment.cause}`)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-400 mb-1">{t('treatment.urdu_name')}</p>
              <p className="font-semibold text-forest-900 text-base" dir="rtl">{treatment.urdu_name}</p>
            </div>
          </div>
        </motion.div>

        {/* Severity signs */}
        {treatment.severity_indicators.length > 0 && (
          <Section icon={AlertTriangle} title={t('treatment.severity_signs')}>
            <ul className="space-y-2">
              {treatment.severity_indicators.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-severity-high mt-2 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Symptoms */}
        <Section icon={AlertTriangle} title={t('treatment.symptoms')}>
          <ul className="space-y-2">
            {treatment.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-wheat-500 mt-2 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* Organic treatment */}
        {treatment.organic_treatment.length > 0 && (
          <Section icon={Sprout} title={t('treatment.organic')}>
            <ul className="space-y-2">
              {treatment.organic_treatment.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-severity-low mt-2 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Chemical treatment */}
        {treatment.chemical_treatment.length > 0 && (
          <Section icon={Beaker} title={t('treatment.chemical')}>
            <div className="space-y-3">
              {treatment.chemical_treatment.map((c, i) => (
                <div key={i} className="bg-earth-50 rounded-2xl p-4">
                  <p className="font-semibold text-forest-900 text-sm mb-2">{c.name}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400">{t('treatment.dosage')}: </span>
                      {c.dosage}
                    </div>
                    <div>
                      <span className="text-gray-400">{t('treatment.frequency')}: </span>
                      {c.frequency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Prevention */}
        {treatment.prevention.length > 0 && (
          <Section icon={ShieldCheck} title={t('treatment.prevention')}>
            <ul className="space-y-2">
              {treatment.prevention.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-400 mt-2 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}
        </div>
      </motion.div>
    </div>
  )
}
