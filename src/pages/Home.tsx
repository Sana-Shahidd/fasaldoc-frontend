import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ImageIcon, Leaf, AlertCircle, Lightbulb, Zap, Shield, Globe } from 'lucide-react'
import { predict } from '../api/client'
import { useStore } from '../store/store'
import { useUserId } from '../hooks/useUserId'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LoadingSpinner from '../components/LoadingSpinner'
import CameraModal from '../components/CameraModal'

const MAX_SIZE = 5 * 1024 * 1024

export default function Home() {
  const { t } = useTranslation()
  const navigate   = useNavigate()
  const userId     = useUserId()
  const setResult  = useStore(s => s.setResult)
  const setLocation = useStore(s => s.setLocation)

  const galleryRef = useRef<HTMLInputElement>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [preview, setPreview]       = useState<string | null>(null)

  const getLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(null)
      navigator.geolocation.getCurrentPosition(
        pos => { setLocation(pos.coords.latitude, pos.coords.longitude); resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }) },
        () => resolve(null),
        { timeout: 5000 }
      )
    })
  }, [setLocation])

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) { setError(t('errors.file_type')); return }
    if (file.size > MAX_SIZE) { setError(t('errors.file_size')); return }

    setPreview(URL.createObjectURL(file))
    setLoading(true)
    try {
      const loc    = await getLocation()
      const result = await predict(file, userId, loc?.lat, loc?.lng)
      setResult(result, file)
      navigate('/results')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(msg ?? t('errors.network'))
    } finally { setLoading(false); setPreview(null) }
  }, [getLocation, navigate, setResult, t, userId])

  const onGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-earth-50 flex flex-col">
      {/* Hero header */}
      <div className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-600 pt-12 md:pt-16 pb-16 md:pb-20 px-5 md:px-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-white/5" />

        {/* Top row */}
        <div className="flex items-center justify-between relative z-10 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-soft backdrop-blur-sm">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-none">{t('app_name')}</span>
              <p className="text-forest-200 text-xs leading-none mt-0.5">{t('tagline')}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          {/* Floating leaf icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="w-24 h-24 mx-auto mb-5 rounded-full bg-white/15 flex items-center justify-center shadow-float backdrop-blur-sm border border-white/20"
          >
            <Leaf size={44} className="text-white opacity-90" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-2">{t('home.greeting')}</h1>
          <p className="text-forest-200 text-sm max-w-xs mx-auto mb-6">{t('home.subtitle')}</p>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center max-w-xs md:max-w-sm mx-auto">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setCameraOpen(true)}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-forest-800 font-bold py-4 rounded-2xl shadow-float hover:bg-forest-50 active:bg-earth-100 transition-colors disabled:opacity-60 text-sm"
            >
              <Camera size={20} />
              {t('home.camera_btn')}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => galleryRef.current?.click()}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-white/15 text-white font-bold py-4 rounded-2xl border border-white/25 hover:bg-white/20 transition-colors disabled:opacity-60 text-sm backdrop-blur-sm"
            >
              <ImageIcon size={20} />
              {t('home.gallery_btn')}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-earth-100 px-5 md:px-8 py-3">
        <div className="flex items-center justify-around md:justify-start md:gap-12 max-w-xs md:max-w-none mx-auto md:mx-0">
          {[
            { icon: Zap,    value: '38',    label: t('home.stat_diseases') },
            { icon: Shield, value: '96.1%', label: t('home.stat_accuracy') },
            { icon: Globe,  value: '4',     label: t('home.stat_languages') },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-forest-50 flex items-center justify-center">
                <Icon size={14} className="text-forest-700" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm leading-none">{value}</p>
                <p className="text-gray-400 text-xs leading-none mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 px-5 md:px-8 py-5 md:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-8 space-y-4 md:space-y-0">
            {/* Left column */}
            <div className="space-y-4">
              {/* Tip card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-start gap-3 px-4 py-3.5 bg-wheat-100 rounded-2xl border border-wheat-200"
              >
                <div className="w-7 h-7 rounded-lg bg-wheat-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb size={14} className="text-wheat-600" />
                </div>
                <p className="text-sm text-wheat-600 leading-relaxed">{t('home.tip')}</p>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl"
                  >
                    <AlertCircle size={18} className="text-severity-high flex-shrink-0" />
                    <p className="text-sm text-severity-high">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trusted badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-2 md:text-left"
              >
                <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start gap-1.5">
                  <span className="text-base">🇵🇰</span>
                  {t('home.trusted')}
                </p>
              </motion.div>
            </div>

            {/* Right column — Quick guide cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 md:grid-cols-1 gap-3"
            >
              {[
                { emoji: '📸', title: t('home.step1_title'), desc: t('home.step1_desc') },
                { emoji: '🔍', title: t('home.step2_title'), desc: t('home.step2_desc') },
                { emoji: '💊', title: t('home.step3_title'), desc: t('home.step3_desc') },
              ].map(card => (
                <div key={card.title} className="bg-white rounded-2xl p-3 md:p-4 shadow-soft text-center md:flex md:items-center md:gap-4 md:text-left">
                  <div className="text-2xl md:text-3xl mb-1 md:mb-0 md:flex-shrink-0">{card.emoji}</div>
                  <div>
                    <p className="font-semibold text-forest-900 text-xs md:text-sm">{card.title}</p>
                    <p className="text-gray-400 text-[10px] md:text-xs leading-tight mt-0.5">{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-6"
          >
            {preview && (
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={preview}
                className="w-44 h-44 object-cover rounded-3xl shadow-float border-4 border-white/20"
              />
            )}
            <LoadingSpinner size={48} color="#ffffff" label={t('home.analyzing')} />
          </motion.div>
        )}
      </AnimatePresence>

      <CameraModal open={cameraOpen} onCapture={handleFile} onClose={() => setCameraOpen(false)} />
      <input ref={galleryRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={onGalleryChange} />
    </div>
  )
}
